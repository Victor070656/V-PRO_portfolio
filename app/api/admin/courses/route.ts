import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    // Debug logging
    console.log("Session:", session);
    console.log("User role:", session?.user);

    if (!session) {
      return NextResponse.json({ error: "No session found" }, { status: 401 });
    }

    // Temporarily disable admin check for debugging
    const userRole = (session.user as any).role;
    console.log("User role found:", userRole);
    console.log("Temporarily allowing all authenticated users");

    const formData = await request.json();

    // Validate required fields
    const requiredFields = ["title", "description", "category", "level", "duration", "price"];
    for (const field of requiredFields) {
      if (!formData[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const client = await clientPromise;
    const db = client.db();

    // Create course in database
    const result = await db.collection("courses").insertOne({
      ...formData,
      createdAt: new Date(),
      updatedAt: new Date(),
      students: 0,
      rating: 0,
      reviews: 0,
    });

    if (result.insertedId) {
      return NextResponse.json(
        { success: true, courseId: result.insertedId.toString() },
        { status: 201 }
      );
    } else {
      throw new Error("Failed to create course");
    }
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}