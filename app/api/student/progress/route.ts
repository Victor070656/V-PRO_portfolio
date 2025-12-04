import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET student's progress across all courses
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

    // Fetch all enrollments with progress
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
            courseId: 1,
            courseTitle: "$courseData.title",
            progress: 1,
            completedLessons: 1,
            totalLessons: { $size: { $ifNull: ["$courseData.lessons", []] } },
            lastAccessedAt: 1,
            enrolledAt: 1
          }
        },
        {
          $sort: { lastAccessedAt: -1 }
        }
      ])
      .toArray();

    // Calculate overall stats
    const totalCourses = enrollments.length;
    const completedCourses = enrollments.filter(e => e.progress === 100).length;
    const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0);
    const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

    return NextResponse.json({ 
      enrollments,
      stats: {
        totalCourses,
        completedCourses,
        averageProgress,
        inProgress: totalCourses - completedCourses
      }
    });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Failed to fetch progress" },
      { status: 500 }
    );
  }
}
