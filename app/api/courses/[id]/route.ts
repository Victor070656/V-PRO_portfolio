import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET single course by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db();

    const course = await db
      .collection("courses")
      .findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get session to check if user is enrolled (for additional data)
    const session = await getServerSession(authOptions);
    let enrollment = null;

    if (session) {
      const userId = new ObjectId((session.user as any).id);
      enrollment = await db.collection("enrollments").findOne({
        userId: userId,
        courseId: new ObjectId(id),
      });
    }

    // Serialize ObjectIds to strings for lessons
    const serializedCourse = {
      ...course,
      _id: course._id.toString(),
      lessons: course.lessons?.map((lesson: any) => ({
        ...lesson,
        _id: lesson._id?.toString(),
      })) || [],
    };

    return NextResponse.json({
      course: serializedCourse,
      enrollment: enrollment ? {
        progress: enrollment.progress || 0,
        completedLessons: enrollment.completedLessons?.map((id: any) => id.toString()) || [],
        lastAccessedAt: enrollment.lastAccessedAt,
        certificateIssued: enrollment.certificate?.issued || false,
      } : null,
    });

  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

// PUT update course (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user is admin
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId((session.user as any).id) });

    if (!user) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const updateData = await request.json();

    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, students, rating, reviews, ...allowedUpdates } =
      updateData;

    const course = await db.collection("courses").findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...allowedUpdates,
          updatedAt: new Date(),
        },
      },
      { returnDocument: "after" }
    );

    if (!course?.value) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({
      message: "Course updated successfully",
      course: course.value,
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

// DELETE course (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user is admin
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId((session.user as any).id) });

    if (!user) {
      return NextResponse.json(
        { error: "Admin access required" },
        { status: 403 }
      );
    }

    const result = await db.collection("courses").deleteOne({
      _id: new ObjectId(id),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Also delete related enrollments and progress
    await db.collection("enrollments").deleteMany({
      courseId: new ObjectId(id),
    });

    await db.collection("progress").deleteMany({
      courseId: new ObjectId(id),
    });

    return NextResponse.json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting course:", error);
    return NextResponse.json(
      { error: "Failed to delete course" },
      { status: 500 }
    );
  }
}
