import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET student's enrolled courses
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

    // Fetch enrollments with course details
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
            as: "courseData"
          }
        },
        {
          $unwind: "$courseData"
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
            course: {
              _id: "$courseData._id",
              title: "$courseData.title",
              description: "$courseData.description",
              thumbnail: "$courseData.thumbnail",
              category: "$courseData.category",
              level: "$courseData.level",
              duration: "$courseData.duration",
              instructor: "$courseData.instructor",
              lessons: "$courseData.lessons"
            },
            certificateIssued: { $ifNull: ["$certificate.issued", false] }
          }
        },
        {
          $sort: { lastAccessedAt: -1, enrolledAt: -1 }
        }
      ])
      .toArray();

    return NextResponse.json({ enrollments });
  } catch (error) {
    console.error("Error fetching student courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}
