import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();
    const courses = await db.collection("courses").find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await req.json();
    
    // Basic validation
    if (!data.title || !data.description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db();

    const newCourse = {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
      students: 0,
      rating: 0,
      reviews: 0,
      isPublished: false, // Default to draft
    };

    const result = await db.collection("courses").insertOne(newCourse);

    return NextResponse.json({ success: true, courseId: result.insertedId }, { status: 201 });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}