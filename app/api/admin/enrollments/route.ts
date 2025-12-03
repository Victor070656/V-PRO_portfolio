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

    // Fetch all enrollments with student and course details
    const enrollments = await db.collection("enrollments")
      .aggregate([
        {
          $lookup: {
            from: "students",
            localField: "userId",
            foreignField: "_id",
            as: "student"
          }
        },
        {
          $lookup: {
            from: "courses",
            localField: "courseId",
            foreignField: "_id",
            as: "course"
          }
        },
        {
          $unwind: "$student"
        },
        {
          $unwind: "$course"
        },
        {
          $project: {
            _id: 1,
            studentName: {
              $concat: [
                { $ifNull: ["$student.profile.firstName", ""] },
                " ",
                { $ifNull: ["$student.profile.lastName", ""] }
              ]
            },
            studentEmail: "$student.email",
            courseTitle: "$course.title",
            progress: 1,
            enrolledAt: 1,
            lastAccessedAt: 1,
            completedLessons: { $size: { $ifNull: ["$completedLessons", []] } }
          }
        },
        {
          $sort: { enrolledAt: -1 }
        }
      ])
      .toArray();

    return NextResponse.json({
      success: true,
      enrollments
    });

  } catch (error) {
    console.error("Error fetching enrollments:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
