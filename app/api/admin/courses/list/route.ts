import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Temporarily allow all authenticated users (same as other endpoints)
    console.log("User session:", session);
    console.log("User role:", (session.user as any).role);

    const client = await clientPromise;
    const db = client.db();

    // Get ALL courses (including drafts) for admin
    const courses = await db
      .collection("courses")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Convert _id to string for each course
    const formattedCourses = courses.map(course => ({
      ...course,
      _id: course._id.toString(),
    }));

    return NextResponse.json({
      courses: formattedCourses,
    });
  } catch (error) {
    console.error("Error fetching admin courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}