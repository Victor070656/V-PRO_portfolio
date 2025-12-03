import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { Course } from "@/lib/models/course";
import { ObjectId } from "mongodb";

// GET all courses (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const level = searchParams.get("level");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const sort = searchParams.get("sort") || "createdAt";

    const client = await clientPromise;
    const db = client.db();

    // Build filter query
    const filter: any = { isPublished: true };

    if (category && category !== "all") {
      filter.category = category;
    }

    if (level && level !== "all") {
      filter.level = level;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { "instructor.name": { $regex: search, $options: "i" } }
      ];
    }

    // Build sort query
    let sortQuery: any = {};
    switch (sort) {
      case "popular":
        sortQuery = { students: -1 };
        break;
      case "rating":
        sortQuery = { rating: -1 };
        break;
      case "price-low":
        sortQuery = { price: 1 };
        break;
      case "price-high":
        sortQuery = { price: -1 };
        break;
      case "newest":
        sortQuery = { createdAt: -1 };
        break;
      default:
        sortQuery = { createdAt: -1 };
    }

    const skip = (page - 1) * limit;

    const courses = await db
      .collection("courses")
      .find(filter)
      .sort(sortQuery)
      .skip(skip)
      .limit(limit)
      .toArray();

    const total = await db.collection("courses").countDocuments(filter);

    return NextResponse.json({
      courses,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching courses:", error);
    return NextResponse.json(
      { error: "Failed to fetch courses" },
      { status: 500 }
    );
  }
}

// POST new course (admin only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if user is admin (assuming admin has specific role or username)
    const user = await db
      .collection("users")
      .findOne({ _id: new ObjectId((session.user as any).id) });

    if (!user) {
      return NextResponse.json({ error: "Admin access required" }, { status: 403 });
    }

    const courseData: Course = await request.json();

    // Validate required fields
    const requiredFields = [
      "title",
      "description",
      "category",
      "price",
      "level",
      "language",
      "instructor"
    ];

    for (const field of requiredFields) {
      if (!courseData[field as keyof Course]) {
        return NextResponse.json(
          { error: `Field '${field}' is required` },
          { status: 400 }
        );
      }
    }

    // Set default values
    const newCourse = {
      ...courseData,
      students: 0,
      rating: 0,
      reviews: 0,
      lessons: courseData.lessons || [],
      requirements: courseData.requirements || [],
      objectives: courseData.objectives || [],
      isPublished: courseData.isPublished || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection("courses").insertOne(newCourse);

    return NextResponse.json({
      message: "Course created successfully",
      course: { ...newCourse, _id: result.insertedId },
    });
  } catch (error) {
    console.error("Error creating course:", error);
    return NextResponse.json(
      { error: "Failed to create course" },
      { status: 500 }
    );
  }
}