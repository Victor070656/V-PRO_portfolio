import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Get overall progress statistics
    const totalLessons = await db.collection("progress").countDocuments();
    const completedLessons = await db.collection("progress").countDocuments({ completed: true });
    
    // Get course-wise progress
    const courseProgress = await db.collection("enrollments")
      .aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: "$course"
        },
        {
          $group: {
            _id: "$courseId",
            courseTitle: { $first: "$course.title" },
            totalEnrollments: { $sum: 1 },
            avgProgress: { $avg: "$progress" },
            completedCount: {
              $sum: { $cond: [{ $gte: ["$progress", 100] }, 1, 0] }
            }
          }
        },
        {
          $sort: { totalEnrollments: -1 }
        }
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      stats: {
        totalLessons,
        completedLessons,
        completionRate: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0
      },
      courseProgress
    });

  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
