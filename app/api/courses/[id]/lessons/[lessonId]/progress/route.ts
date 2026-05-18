import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Db, ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";

async function syncEnrollmentProgress(
  db: Db,
  userId: ObjectId,
  courseId: ObjectId
): Promise<
  | {
      totalLessons: number;
      completedLessonIds: ObjectId[];
      progressPercentage: number;
      error?: never;
    }
  | {
      error: NextResponse;
      totalLessons?: never;
      completedLessonIds?: never;
      progressPercentage?: never;
    }
> {
  const course = await db.collection("courses").findOne({ _id: courseId });
  if (!course) {
    return {
      error: NextResponse.json({ error: "Course not found" }, { status: 404 }),
    };
  }

  const totalLessons = course.lessons?.length || 0;
  const allLessonProgress = await db
    .collection("progress")
    .find({ userId, courseId })
    .toArray();

  const completedLessonIds = allLessonProgress
    .filter((progress) => progress.completed)
    .map((progress) => progress.lessonId);

  const progressPercentage =
    totalLessons > 0
      ? Math.round((completedLessonIds.length / totalLessons) * 100)
      : 0;

  await db.collection("enrollments").updateOne(
    { userId, courseId },
    {
      $set: {
        completedLessons: completedLessonIds,
        progress: progressPercentage,
        lastAccessedAt: new Date(),
        ...(progressPercentage === 100
          ? { completedAt: new Date() }
          : { completedAt: null }),
        ...(progressPercentage === 100 && {
          "certificate.issued": true,
          "certificate.issuedAt": new Date(),
        }),
      },
    }
  );

  return {
    totalLessons,
    completedLessonIds,
    progressPercentage,
  };
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, lessonId } = await params;

    const client = await clientPromise;
    const db = client.db();

    const progress = await db.collection("progress").findOne({
      userId: new ObjectId(session.user.id),
      courseId: new ObjectId(courseId),
      lessonId: new ObjectId(lessonId),
    });

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ courseId: string; lessonId: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, lessonId } = await params;
    const { watchTime, lastPosition, completed } = await req.json();

    const client = await clientPromise;
    const db = client.db();

    const userObjectId = new ObjectId(session.user.id);
    const courseObjectId = new ObjectId(courseId);
    const lessonObjectId = new ObjectId(lessonId);

    const updateData: Record<string, unknown> = { updatedAt: new Date() };
    if (watchTime !== undefined) updateData.watchTime = watchTime;
    if (lastPosition !== undefined) updateData.lastPosition = lastPosition;
    if (completed !== undefined) {
      updateData.completed = completed;
      if (completed) {
        updateData.completedAt = new Date();
      } else {
        updateData.completedAt = null;
      }
    }

    await db.collection("progress").updateOne(
      {
        userId: userObjectId,
        courseId: courseObjectId,
        lessonId: lessonObjectId,
      },
      {
        $set: updateData,
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true }
    );

    const syncResult = await syncEnrollmentProgress(db, userObjectId, courseObjectId);
    if ("error" in syncResult) return syncResult.error;

    return NextResponse.json({
      success: true,
      progress: {
        lessonCompleted: Boolean(completed),
        overallProgress: syncResult.progressPercentage,
        completedLessons: syncResult.completedLessonIds.length,
        totalLessons: syncResult.totalLessons,
        courseCompleted: syncResult.progressPercentage === 100,
      },
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
