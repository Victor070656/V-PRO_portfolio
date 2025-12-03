import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { ObjectId } from "mongodb";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Temporarily allow all authenticated users
    const userRole = (session.user as any).role;
    console.log("Get request - User role:", userRole);

    const courseId = params.id;

    const client = await clientPromise;
    const db = client.db();

    // Get course by ID
    const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      course: {
        ...course,
        _id: course._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error fetching course:", error);
    return NextResponse.json(
      { error: "Failed to fetch course" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Temporarily allow all authenticated users
    const userRole = (session.user as any).role;
    console.log("Update request - User role:", userRole);

    const courseId = params.id;
    const courseData = await request.json();

    const {
      title,
      description,
      category,
      price,
      originalPrice,
      duration,
      level,
      language,
      requirements,
      objectives,
      thumbnail,
      lessons,
      instructor,
    } = courseData;

    // Validate required fields
    if (!title || !description || !category || !price) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Get existing course
    const course = await db.collection("courses").findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return NextResponse.json(
        { error: "Course not found" },
        { status: 404 }
      );
    }

    // Allow editing both draft and published courses
    console.log("Course publish status:", course.isPublished);

    // Update course - exclude _id from the update to avoid immutable field error
    const { _id, ...updateData } = courseData;
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(courseId) },
      {
        $set: {
          ...updateData,
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

    return NextResponse.json({
      success: true,
      message: "Course updated successfully",
      course: {
        ...updatedCourse,
        _id: updatedCourse._id.toString(),
      },
    });
  } catch (error) {
    console.error("Error updating course:", error);
    return NextResponse.json(
      { error: "Failed to update course" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Temporarily allow all authenticated users
    const userRole = (session.user as any).role;
    console.log("Delete request - User role:", userRole);

    const courseId = params.id;

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

    // Allow deleting both draft and published courses
    console.log("Deleting course with publish status:", course.isPublished);

    // Delete course
    const result = await db.collection("courses").deleteOne({ _id: new ObjectId(courseId) });

    if (!result.deletedCount) {
      return NextResponse.json(
        { error: "Failed to delete course" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
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