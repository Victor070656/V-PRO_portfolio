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

    const { transactionId, txRef } = await request.json();

    if (!transactionId) {
      return NextResponse.json(
        { error: "Transaction ID is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Verify the transaction with Flutterwave
    const verificationResult = await flutterwaveService.verifyTransaction(transactionId);

    if (verificationResult.success && verificationResult.data) {
      const paymentData = verificationResult.data;

      // Check if payment was successful
      if (paymentData.status === 'successful') {
        // Check if payment record already exists
        const existingPayment = await db.collection("payments").findOne({
          transactionId: paymentData.transaction_id
        });

        if (existingPayment) {
          return NextResponse.json({
            success: true,
            alreadyProcessed: true,
            message: "Payment already processed"
          });
        }

        // Create payment record
        const paymentRecord = {
          userId: new ObjectId(paymentData.meta.user_id),
          courseId: new ObjectId(paymentData.meta.course_id),
          transactionId: paymentData.transaction_id,
          txRef: paymentData.tx_ref,
          amount: paymentData.amount,
          currency: paymentData.currency,
          status: 'successful',
          paymentMethod: 'flutterwave',
          customer: {
            email: paymentData.customer.email,
            name: paymentData.customer.name,
            phone: paymentData.customer.phone
          },
          metadata: {
            course_id: paymentData.meta.course_id,
            user_id: paymentData.meta.user_id
          },
          createdAt: new Date(paymentData.created_at),
          verifiedAt: new Date()
        };

        const paymentResult = await db.collection("payments").insertOne(paymentRecord);

        // Update payment initialization status
        await db.collection("payment_initializations").updateOne(
          { txRef: paymentData.tx_ref },
          {
            $set: {
              status: "successful",
              transactionId: paymentData.transaction_id,
              verifiedAt: new Date()
            }
          }
        );

        // Create enrollment
        const existingEnrollment = await db.collection("enrollments").findOne({
          userId: new ObjectId(paymentData.meta.user_id),
          courseId: new ObjectId(paymentData.meta.course_id)
        });

        if (!existingEnrollment) {
          const enrollment = {
            userId: new ObjectId(paymentData.meta.user_id),
            courseId: new ObjectId(paymentData.meta.course_id),
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
            { _id: new ObjectId(paymentData.meta.course_id) },
            { $inc: { students: 1 } }
          );
        }

        return NextResponse.json({
          success: true,
          payment: {
            id: paymentResult.insertedId,
            transactionId: paymentData.transaction_id,
            amount: paymentData.amount,
            status: 'successful',
            courseTitle: null // Will be populated from course lookup
          },
          enrollment: true
        });
      } else {
        return NextResponse.json({
          success: false,
          status: paymentData.status,
          message: "Payment was not successful"
        });
      }
    } else {
      return NextResponse.json(
        {
          success: false,
          error: verificationResult.error || "Payment verification failed"
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { error: "Payment verification service unavailable" },
      { status: 500 }
    );
  }
}