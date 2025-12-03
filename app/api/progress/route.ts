import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET user progress for a course
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get("courseId");

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

    // Get enrollment with progress
    const enrollment = await db.collection("enrollments").findOne({
      userId: userId,
      courseId: courseObjectId
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled in this course" }, { status: 404 });
    }

    // Get detailed progress for each lesson
    const lessonProgress = await db.collection("progress").find({
      userId: userId,
      courseId: courseObjectId
    }).toArray();

    // Get course details with lessons
    const course = await db.collection("courses").findOne({
      _id: courseObjectId
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Combine lesson data with progress
    const lessonsWithProgress = course.lessons.map((lesson: any) => {
      const progress = lessonProgress.find((p: any) =>
        p.lessonId.toString() === lesson._id?.toString()
      );

      return {
        ...lesson,
        progress: progress || {
          completed: false,
          watchTime: 0,
          lastPosition: 0
        }
      };
    });

    return NextResponse.json({
      enrollment,
      lessonsWithProgress,
      overallProgress: enrollment.progress,
      completedLessons: enrollment.completedLessons.length,
      totalLessons: course.lessons.length
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}

// POST update lesson progress
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, lessonId, completed, watchTime, lastPosition } = await request.json();

    if (!courseId || !lessonId) {
      return NextResponse.json(
        { error: "Course ID and Lesson ID are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);
    const courseObjectId = new ObjectId(courseId);
    const lessonObjectId = new ObjectId(lessonId);

    // Check if user is enrolled
    const enrollment = await db.collection("enrollments").findOne({
      userId: userId,
      courseId: courseObjectId
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Not enrolled in this course" }, { status: 404 });
    }

    // Update or create lesson progress
    const progressData: any = {
      userId: userId,
      courseId: courseObjectId,
      lessonId: lessonObjectId,
      completed: completed || false,
      watchTime: watchTime || 0,
      lastPosition: lastPosition || 0,
      completedAt: completed ? new Date() : undefined,
    };

    await db.collection("progress").updateOne(
      {
        userId: userId,
        courseId: courseObjectId,
        lessonId: lessonObjectId
      },
      {
        $set: progressData,
        $setOnInsert: { createdAt: new Date() }
      },
      { upsert: true }
    );

    // Calculate overall progress
    const course = await db.collection("courses").findOne({
      _id: courseObjectId
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Get all lesson progress for this course
    const allLessonProgress = await db.collection("progress").find({
      userId: userId,
      courseId: courseObjectId
    }).toArray();

    const completedLessons = allLessonProgress.filter(p => p.completed);
    const overallProgress = Math.round((completedLessons.length / course.lessons.length) * 100);

    // Update enrollment
    const updatedCompletedLessons = completedLessons.map(p => p.lessonId);
    const isCourseCompleted = overallProgress === 100;

    await db.collection("enrollments").updateOne(
      {
        userId: userId,
        courseId: courseObjectId
      },
      {
        $set: {
          progress: overallProgress,
          completedLessons: updatedCompletedLessons,
          lastAccessedAt: new Date(),
          completedAt: isCourseCompleted ? new Date() : enrollment.completedAt,
          ...(isCourseCompleted && {
            "certificate.issued": true,
            "certificate.issuedAt": new Date()
          })
        }
      }
    );

    return NextResponse.json({
      message: "Progress updated successfully",
      progress: {
        lessonCompleted: completed,
        overallProgress,
        completedLessons: completedLessons.length,
        totalLessons: course.lessons.length,
        courseCompleted: isCourseCompleted
      }
    });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Failed to update progress" },
      { status: 500 }
    );
  }
}