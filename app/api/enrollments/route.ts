import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET user enrollments
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

    const enrollments = await db
      .collection("enrollments")
      .aggregate([
        {
          $match: { userId: userId }
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: "$course"
        },
        {
          $project: {
            _id: 1,
            enrolledAt: 1,
            completedAt: 1,
            progress: 1,
            completedLessons: 1,
            lastAccessedAt: 1,
            certificate: 1,
            "course._id": 1,
            "course.title": 1,
            "course.description": 1,
            "course.thumbnail": 1,
            "course.category": 1,
            "course.level": 1,
            "course.duration": 1,
            "course.instructor": 1,
            "course.lessons": 1
          }
        },
        {
          $sort: { enrolledAt: -1 }
        }
      ])
      .toArray();

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Failed to fetch enrollments" },
      { status: 500 }
    );
  }
}

// POST create enrollment (enroll in course)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, paymentId } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);
    const courseObjectId = new ObjectId(courseId);

    // Check if course exists
    const course = await db.collection("courses").findOne({
      _id: courseObjectId,
      isPublished: true
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId: userId,
      courseId: courseObjectId
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    // In a real application, you would verify payment here
    // For now, we'll assume payment is valid if paymentId is provided
    if (course.price > 0 && !paymentId) {
      return NextResponse.json(
        { error: "Payment required for this course" },
        { status: 402 }
      );
    }

    // Create enrollment
    const enrollment = {
      userId: userId,
      courseId: courseObjectId,
      enrolledAt: new Date(),
      progress: 0,
      completedLessons: [],
      lastAccessedAt: new Date(),
      certificate: {
        issued: false
      }
    };

    const result = await db.collection("enrollments").insertOne(enrollment);

    // Update course student count
    await db.collection("courses").updateOne(
      { _id: courseObjectId },
      { $inc: { students: 1 } }
    );

    return NextResponse.json({
      message: "Enrolled successfully",
      enrollment: { ...enrollment, _id: result.insertedId }
    });
  } catch (error) {
    console.error("Error creating enrollment:", error);
    return NextResponse.json(
      { error: "Failed to enroll in course" },
      { status: 500 }
    );
  }
}