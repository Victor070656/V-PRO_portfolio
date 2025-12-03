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

    // Fetch all students with their enrollment and progress data
    const students = await db.collection("students").find({}).toArray();

    // For each student, get enrollment count and progress
    const studentsWithStats = await Promise.all(
      students.map(async (student) => {
        const enrollmentCount = await db.collection("enrollments").countDocuments({
          userId: student._id
        });

        const enrollments = await db.collection("enrollments").find({
          userId: student._id
        }).toArray();

        const totalProgress = enrollments.reduce((sum, e) => sum + (e.progress || 0), 0);
        const avgProgress = enrollments.length > 0 ? totalProgress / enrollments.length : 0;

        return {
          _id: student._id.toString(),
          username: student.username,
          email: student.email,
          name: `${student.profile?.firstName || ''} ${student.profile?.lastName || ''}`.trim() || student.username,
          enrollmentCount,
          avgProgress: Math.round(avgProgress),
          createdAt: student.createdAt,
          lastAccessedAt: enrollments.length > 0 
            ? enrollments.sort((a, b) => new Date(b.lastAccessedAt).getTime() - new Date(a.lastAccessedAt).getTime())[0].lastAccessedAt
            : student.createdAt
        };
      })
    );

    return NextResponse.json({
      success: true,
      students: studentsWithStats
    });

  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}