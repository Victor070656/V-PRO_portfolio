import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// PUT update a lesson
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, lessonId } = await params;
    const lessonData = await req.json();
    
    const client = await clientPromise;
    const db = client.db();

    // First, get the course to find the lesson index
    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });
    
    if (!course || !course.lessons) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Find the lesson index - handle both ObjectId and string _id
    const lessonIndex = course.lessons.findIndex((lesson: any) => {
      const lessonIdStr = lesson._id?.toString();
      return lessonIdStr === lessonId;
    });

    if (lessonIndex === -1) {
      return NextResponse.json({ error: "Lesson not found" }, { status: 404 });
    }

    // Update the specific lesson using array index
    const updateFields: any = {};
    updateFields[`lessons.${lessonIndex}.title`] = lessonData.title;
    updateFields[`lessons.${lessonIndex}.description`] = lessonData.description;
    updateFields[`lessons.${lessonIndex}.videoUrl`] = lessonData.videoUrl;
    updateFields[`lessons.${lessonIndex}.duration`] = lessonData.duration || 0;
    updateFields[`lessons.${lessonIndex}.order`] = lessonData.order;
    updateFields[`lessons.${lessonIndex}.isPublished`] = lessonData.isPublished || false;
    updateFields[`lessons.${lessonIndex}.resources`] = lessonData.resources || [];
    updateFields['updatedAt'] = new Date();

    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateFields }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating lesson:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE a lesson
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string; lessonId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, lessonId } = await params;
    
    const client = await clientPromise;
    const db = client.db();

    // Remove lesson from course
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { 
        $pull: { lessons: { _id: new ObjectId(lessonId) } } as any,
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting lesson:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
