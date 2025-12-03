import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const progress = await db.collection("progress").findOne({
      userId: new ObjectId(session.user.id),
      courseId: new ObjectId(params.courseId),
      lessonId: new ObjectId(params.lessonId),
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; lessonId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    const { watchTime, lastPosition, completed } = data;

    const client = await clientPromise;
    const db = client.db();

    const updateData: any = {
      updatedAt: new Date(),
    };

    if (watchTime !== undefined) updateData.watchTime = watchTime;
    if (lastPosition !== undefined) updateData.lastPosition = lastPosition;
    if (completed !== undefined) {
      updateData.completed = completed;
      if (completed) updateData.completedAt = new Date();
    }

    await db.collection("progress").updateOne(
      {
        userId: new ObjectId(session.user.id),
        courseId: new ObjectId(params.courseId),
        lessonId: new ObjectId(params.lessonId),
      },
      {
        $set: updateData,
        $setOnInsert: {
          createdAt: new Date(),
        },
      },
      { upsert: true }
    );

    // Also update enrollment progress if completed
    if (completed) {
      // Logic to calculate overall course progress would go here
      // For now, we just ensure the lesson is marked as completed in enrollment
      await db.collection("enrollments").updateOne(
        {
          userId: new ObjectId(session.user.id),
          courseId: new ObjectId(params.courseId),
        },
        {
          $addToSet: { completedLessons: new ObjectId(params.lessonId) },
          $set: { lastAccessedAt: new Date() }
        }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
