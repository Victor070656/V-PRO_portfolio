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

    // Calculate total revenue
    const payments = await db.collection("payments").find({ status: "successful" }).toArray();
    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Count total students (unique users in enrollments)
    const enrollments = await db.collection("enrollments").find({}).toArray();
    const uniqueStudents = new Set(enrollments.map(e => e.userId.toString()));
    
    // Count total courses
    const totalCourses = await db.collection("courses").countDocuments();

    return NextResponse.json({
      success: true,
      data: {
        totalRevenue,
        totalStudents: uniqueStudents.size,
        activeEnrollments: enrollments.length,
        totalCourses
      }
    });

  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
