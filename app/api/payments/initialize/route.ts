import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { flutterwaveService } from "@/lib/flutterwave";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { courseId, paymentMethod } = await request.json();

    if (!courseId) {
      return NextResponse.json(
        { error: "Course ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Get course details
    const course = await db.collection("courses").findOne({
      _id: new ObjectId(courseId),
      isPublished: true
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" }, { status: 404 });
    }

    // Check if already enrolled
    const existingEnrollment = await db.collection("enrollments").findOne({
      userId: new ObjectId((session.user as any).id),
      courseId: new ObjectId(courseId)
    });

    if (existingEnrollment) {
      return NextResponse.json(
        { error: "Already enrolled in this course" },
        { status: 400 }
      );
    }

    // Get user details - check both users and students collections based on role
    const userRole = (session.user as any).role || 'student';
    const collection = userRole === "admin" ? "users" : "students";

    console.log(`Looking for user in ${collection} collection with ID: ${(session.user as any).id}`);

    const user = await db.collection(collection).findOne({
      _id: new ObjectId((session.user as any).id)
    });

    if (!user) {
      console.error(`User not found in ${collection} collection. Session:`, session);
      return NextResponse.json({
        error: "User not found",
        debug: {
          userId: (session.user as any).id,
          role: userRole,
          collection: collection
        }
      }, { status: 404 });
    }

    // Skip payment for free courses
    if (course.price === 0) {
      return NextResponse.json({
        success: true,
        freeCourse: true,
        message: "Free course - no payment required"
      });
    }

    // Initialize Flutterwave payment
    const userName = user.name || user.username || `${user.profile?.firstName || ''} ${user.profile?.lastName || ''}`.trim();
    const paymentResult = await flutterwaveService.initializePayment({
      email: user.email,
      name: userName,
      phone: user.profile?.phone,
      courseId: courseId,
      userId: (session.user as any).id,
      courseTitle: course.title,
      amount: course.price,
      redirectUrl: `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/courses/${courseId}/payment/success`
    });

    if (paymentResult.success && paymentResult.data) {
      // Store payment initialization record
      await db.collection("payment_initializations").insertOne({
        userId: new ObjectId((session.user as any).id),
        courseId: new ObjectId(courseId),
        txRef: paymentResult.data.tx_ref,
        amount: course.price,
        paymentMethod,
        status: "initialized",
        createdAt: new Date()
      });

      return NextResponse.json({
        success: true,
        paymentUrl: paymentResult.data.link,
        txRef: paymentResult.data.tx_ref,
        amount: course.price,
        courseTitle: course.title
      });
    } else {
      return NextResponse.json(
        { error: paymentResult.error || "Payment initialization failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: "Payment service unavailable" },
      { status: 500 }
    );
  }
}