import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// GET student's payment history
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

    // Fetch payments from the payments collection
    const payments = await db
      .collection("payments")
      .aggregate([
        {
          $match: { userId: userId }
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
          $unwind: {
            path: "$courseData",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $project: {
            _id: 1,
            paymentId: 1,
            amount: 1,
            status: 1,
            paymentMethod: 1,
            createdAt: 1,
            courseTitle: "$courseData.title",
            courseThumbnail: "$courseData.thumbnail"
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ])
      .toArray();

    // Calculate payment stats
    const totalSpent = payments
      .filter(p => p.status === 'successful')
      .reduce((sum, p) => sum + (p.amount || 0), 0);
    
    const successfulPayments = payments.filter(p => p.status === 'successful').length;
    const pendingPayments = payments.filter(p => p.status === 'pending').length;

    return NextResponse.json({ 
      payments,
      stats: {
        totalSpent,
        successfulPayments,
        pendingPayments,
        totalTransactions: payments.length
      }
    });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}
