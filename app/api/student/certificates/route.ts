import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET student's certificates
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

    // Fetch enrollments where certificate is issued
    const certificates = await db
      .collection("enrollments")
      .aggregate([
        {
          $match: { 
            userId: userId,
            "certificate.issued": true
          }
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
            courseTitle: "$courseData.title",
            issuedAt: "$certificate.issuedAt",
            certificateUrl: "$certificate.certificateUrl",
            completedAt: 1
          }
        },
        {
          $sort: { "certificate.issuedAt": -1 }
        }
      ])
      .toArray();

    return NextResponse.json({ certificates });
  } catch (error) {
    console.error("Error fetching certificates:", error);
    return NextResponse.json(
      { error: "Failed to fetch certificates" },
      { status: 500 }
    );
  }
}
