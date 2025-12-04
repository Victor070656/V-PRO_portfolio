import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET all lessons for a course
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const client = await clientPromise;
    const db = client.db();

    const course = await db.collection("courses").findOne({ _id: new ObjectId(id) });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ lessons: course.lessons || [] });
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create a new lesson
export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const lessonData = await req.json();
    
    const client = await clientPromise;
    const db = client.db();

    // Create new lesson with ObjectId
    const newLesson = {
      _id: new ObjectId(),
      title: lessonData.title,
      description: lessonData.description,
      videoUrl: lessonData.videoUrl,
      duration: lessonData.duration || 0,
      order: lessonData.order,
      isPublished: lessonData.isPublished || false,
      resources: lessonData.resources || [],
    };

    // Add lesson to course
    const result = await db.collection("courses").updateOne(
      { _id: new ObjectId(id) },
      { 
        $push: { lessons: newLesson } as any,
        $set: { updatedAt: new Date() }
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, lesson: newLesson });
  } catch (error) {
    console.error("Error creating lesson:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
