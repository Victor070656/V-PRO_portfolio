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

    // Get current date and 30 days ago for growth calculations
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    // Calculate total revenue
    const payments = await db.collection("payments").find({ status: "successful" }).toArray();
    const totalRevenue = payments.reduce((acc, curr) => acc + (curr.amount || 0), 0);
    
    // Calculate revenue from last 30 days
    const recentPayments = payments.filter(p => new Date(p.createdAt) >= thirtyDaysAgo);
    const recentRevenue = recentPayments.reduce((acc, curr) => acc + (curr.amount || 0), 0);

    // Get all enrollments
    const enrollments = await db.collection("enrollments").find({}).toArray();
    
    // Count total students (unique users in enrollments)
    const uniqueStudents = new Set(enrollments.map(e => e.userId.toString()));
    
    // Count recent enrollments (last 30 days)
    const recentEnrollments = enrollments.filter(e => 
      e.enrolledAt && new Date(e.enrolledAt) >= thirtyDaysAgo
    );
    
    // Calculate completion rate
    const completedEnrollments = enrollments.filter(e => e.progress >= 100).length;
    const completionRate = enrollments.length > 0 
      ? Math.round((completedEnrollments / enrollments.length) * 100) 
      : 0;

    // Calculate average progress
    const totalProgress = enrollments.reduce((acc, e) => acc + (e.progress || 0), 0);
    const averageProgress = enrollments.length > 0 
      ? Math.round(totalProgress / enrollments.length) 
      : 0;
    
    // Count total courses
    const totalCourses = await db.collection("courses").countDocuments();
    
    // Count published courses
    const publishedCourses = await db.collection("courses").countDocuments({ isPublished: true });

    // Get active students (accessed in last 7 days)
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const activeStudents = enrollments.filter(e => 
      e.lastAccessedAt && new Date(e.lastAccessedAt) >= sevenDaysAgo
    );
    const uniqueActiveStudents = new Set(activeStudents.map(e => e.userId.toString())).size;

    // Calculate growth percentages
    const studentGrowth = recentEnrollments.length > 0 
      ? Math.round((recentEnrollments.length / Math.max(enrollments.length - recentEnrollments.length, 1)) * 100)
      : 0;

    return NextResponse.json({
      success: true,
      data: {
        // Main metrics
        totalRevenue,
        totalStudents: uniqueStudents.size,
        activeEnrollments: enrollments.length,
        totalCourses,
        
        // Additional metrics
        publishedCourses,
        completionRate,
        averageProgress,
        activeStudents: uniqueActiveStudents,
        
        // Growth metrics
        recentEnrollments: recentEnrollments.length,
        recentRevenue,
        studentGrowth,
        
        // Detailed stats
        completedEnrollments,
        inProgressEnrollments: enrollments.length - completedEnrollments,
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
