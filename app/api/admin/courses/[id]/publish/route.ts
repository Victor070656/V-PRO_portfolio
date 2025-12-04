import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temporarily allow all authenticated users
    const userRole = (session.user as any).role;
    console.log("Publish request - User role:", userRole);

    const { id } = await params;
    const courseId = id;
    const { isPublished } = await request.json();

    const client = await clientPromise;
    const db = client.db();

    // Check if course exists
    const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Update course publish status
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(courseId) },
      {
        $set: {
          isPublished,
          updatedAt: new Date(),
        },
      }
    );

    if (!result.modifiedCount) {
      return NextResponse.json(
        { error: "Failed to update course" },
        { status: 500 }
      );
    }

    // Get updated course
    const updatedCourse = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!updatedCourse) {
      return NextResponse.json(
        { error: "Course not found after update" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Course ${isPublished ? "published" : "unpublished"} successfully`,
      course: {
        ...updatedCourse,
        _id: updatedCourse._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating course publish status:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}