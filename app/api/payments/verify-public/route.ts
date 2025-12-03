import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { flutterwaveService } from "@/lib/flutterwave";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const { transactionId, txRef } = await request.json();

    if (!transactionId && !txRef) {
      return NextResponse.json(
        { error: "Transaction ID or tx_ref is required" },
        { status: 400 }
      );
    }

    console.log("Public payment verification:", { transactionId, txRef });

    const client = await clientPromise;
    const db = client.db();

    let paymentData;
    let verified = false;

    // First try to verify with Flutterwave API if we have a transaction ID
    if (transactionId) {
      try {
        const verificationResult = await flutterwaveService.verifyTransaction(transactionId);

        if (verificationResult.success && verificationResult.data) {
          paymentData = verificationResult.data;
          verified = true;
          console.log("Payment verified via Flutterwave API");
        }
      } catch (error) {
        console.error("Flutterwave verification failed:", error);
      }
    }

    // If API verification failed, check if we already have a payment record
    if (!verified) {
      const existingPayment = await db.collection("payments").findOne({
        $or: [
          { transactionId: transactionId },
          { txRef: txRef }
        ]
      });

      if (existingPayment) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          payment: {
            id: existingPayment._id,
            transactionId: existingPayment.transactionId,
            txRef: existingPayment.txRef,
            amount: existingPayment.amount,
            status: existingPayment.status,
            courseTitle: "Course" // Will be populated from course lookup
          },
          enrollment: true
        });
      }

      return NextResponse.json(
        { error: "Payment not found or verification failed" },
        { status: 404 }
      );
    }

    // If we have verified payment data from Flutterwave
    if (paymentData && paymentData.status === 'successful') {
      // Check if payment record already exists
      const existingPayment = await db.collection("payments").findOne({
        transactionId: paymentData.transaction_id || paymentData.id
      });

      if (existingPayment) {
        return NextResponse.json({
          success: true,
          alreadyProcessed: true,
          payment: {
            id: existingPayment._id,
            transactionId: existingPayment.transactionId,
            txRef: existingPayment.txRef,
            amount: existingPayment.amount,
            status: existingPayment.status,
            courseTitle: "Course"
          },
          enrollment: true
        });
      }

      // Extract user and course info from payment metadata
      const userId = paymentData.meta?.user_id;
      const courseId = paymentData.meta?.course_id;

      if (!userId || !courseId) {
        console.error("Missing user_id or course_id in payment metadata");
        return NextResponse.json(
          { error: "Payment metadata incomplete" },
          { status: 400 }
        );
      }

      // Create payment record
      const paymentRecord = {
        userId: new ObjectId(userId),
        courseId: new ObjectId(courseId),
        transactionId: paymentData.transaction_id || paymentData.id,
        txRef: paymentData.tx_ref || txRef,
        amount: paymentData.amount,
        currency: paymentData.currency || 'NGN',
        status: 'successful',
        paymentMethod: 'flutterwave',
        customer: {
          email: paymentData.customer?.email,
          name: paymentData.customer?.name,
          phone: paymentData.customer?.phone_number
        },
        metadata: paymentData.meta,
        createdAt: new Date(paymentData.created_at || Date.now()),
        verifiedAt: new Date()
      };

      const paymentResult = await db.collection("payments").insertOne(paymentRecord);

      // Update payment initialization status if exists
      await db.collection("payment_initializations").updateOne(
        { txRef: paymentData.tx_ref || txRef },
        {
          $set: {
            status: "successful",
            transactionId: paymentData.transaction_id || paymentData.id,
            verifiedAt: new Date()
          }
        }
      );

      // Create enrollment if not already enrolled
      const existingEnrollment = await db.collection("enrollments").findOne({
        userId: new ObjectId(userId),
        courseId: new ObjectId(courseId)
      });

      if (!existingEnrollment) {
        const enrollment = {
          userId: new ObjectId(userId),
          courseId: new ObjectId(courseId),
          paymentId: paymentResult.insertedId,
          enrolledAt: new Date(),
          progress: 0,
          completedLessons: [],
          lastAccessedAt: new Date(),
          certificate: {
            issued: false
          }
        };

        await db.collection("enrollments").insertOne(enrollment);

        // Update course student count
        await db.collection("courses").updateOne(
          { _id: new ObjectId(courseId) },
          { $inc: { students: 1 } }
        );

        console.log(`Enrollment created for user ${userId} in course ${courseId}`);
      }

      return NextResponse.json({
        success: true,
        payment: {
          id: paymentResult.insertedId,
          transactionId: paymentData.transaction_id || paymentData.id,
          txRef: paymentData.tx_ref || txRef,
          amount: paymentData.amount,
          status: 'successful',
          courseTitle: paymentData.meta?.course_title || "Course"
        },
        enrollment: true
      });
    } else {
      return NextResponse.json({
        success: false,
        status: paymentData?.status || 'unknown',
        message: "Payment was not successful"
      });
    }
  } catch (error) {
    console.error("Public payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification service unavailable" },
      { status: 500 }
    );
  }
}