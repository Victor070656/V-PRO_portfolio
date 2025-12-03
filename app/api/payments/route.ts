import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

// In a real application, you would integrate with a payment provider like Stripe
// This is a simplified payment simulation for demonstration

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, amount, paymentMethod } = await request.json();

    if (!courseId || !amount) {
      return NextResponse.json(
        { error: "Course ID and amount are required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);
    const courseObjectId = new ObjectId(courseId);

    // Check if course exists
    const course = await db.collection("courses").findOne({
      _id: courseObjectId,
      isPublished: true
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Verify amount matches course price
    if (amount !== course.price) {
      return NextResponse.json(
        { error: "Invalid payment amount" },
        { status: 400 }
      );
    }

    // Check if already enrolled
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId: userId,
      courseId: courseObjectId
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    // Simulate payment processing
    // In a real app, you would:
    // 1. Create a payment intent with Stripe
    // 2. Handle the payment confirmation webhook
    // 3. Create enrollment after successful payment

    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const payment = {
      _id: new ObjectId(),
      userId: userId,
      courseId: courseObjectId,
      amount: amount,
      currency: "USD",
      status: "completed", // In real app, this would be "pending" initially
      paymentMethod: paymentMethod || "card",
      paymentId: paymentId,
      createdAt: new Date(),
      completedAt: new Date()
    };

    await db.collection("payments").insertOne(payment);

    return NextResponse.json({
      message: "Payment successful",
      payment: {
        id: payment._id,
        paymentId: payment.paymentId,
        amount: payment.amount,
        status: payment.status,
        courseId: courseId
      }
    });
  } catch (error) {
    console.error("Error processing payment:", error);
    return NextResponse.json(
      { error: "Failed to process payment" },
      { status: 500 }
    );
  }
}

// GET user payment history
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    const userId = new ObjectId((session.user as any).id);

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
            as: "course"
          }
        },
        {
          $unwind: "$course"
        },
        {
          $project: {
            _id: 1,
            paymentId: 1,
            amount: 1,
            currency: 1,
            status: 1,
            paymentMethod: 1,
            createdAt: 1,
            completedAt: 1,
            "course._id": 1,
            "course.title": 1,
            "course.thumbnail": 1
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ])
      .toArray();

    return NextResponse.json({ payments });
  } catch (error) {
    console.error("Error fetching payment history:", error);
    return NextResponse.json(
      { error: "Failed to fetch payment history" },
      { status: 500 }
    );
  }
}