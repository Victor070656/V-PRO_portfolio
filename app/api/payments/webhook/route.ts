import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { flutterwaveService } from "@/lib/flutterwave";
import { ObjectId } from "mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("verif-hash");

    // Verify webhook signature
    if (!signature) {
      console.error("Missing webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    if (!flutterwaveService.verifyWebhookSignature(body, signature)) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Parse webhook data
    const webhookData = JSON.parse(body);
    const { event, data } = webhookData;

    console.log("Flutterwave webhook received:", event, data);

    const client = await clientPromise;
    const db = client.db();

    // Process different webhook events
    if (event === 'charge.completed') {
      // Payment successful
      if (data.status === 'successful') {
        // Check if payment already processed
        const existingPayment = await db.collection("payments").findOne({
          transactionId: data.id.toString()
        });

        if (!existingPayment) {
          // Create payment record
          const paymentRecord = {
            userId: new ObjectId(data.meta.user_id),
            courseId: new ObjectId(data.meta.course_id),
            transactionId: data.id.toString(),
            txRef: data.tx_ref,
            amount: data.amount,
            currency: data.currency,
            status: 'successful',
            paymentMethod: 'flutterwave',
            customer: {
              email: data.customer.email,
              name: data.customer.name,
              phone: data.customer.phone_number
            },
            metadata: data.meta,
            createdAt: new Date(data.created_at),
            webhookProcessedAt: new Date()
          };

          const paymentResult = await db.collection("payments").insertOne(paymentRecord);

          // Create enrollment if not already enrolled
          const existingEnrollment = await db.collection("enrollments").findOne({
            userId: new ObjectId(data.meta.user_id),
            courseId: new ObjectId(data.meta.course_id)
          });

          if (!existingEnrollment) {
            const enrollment = {
              userId: new ObjectId(data.meta.user_id),
              courseId: new ObjectId(data.meta.course_id),
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
              { _id: new ObjectId(data.meta.course_id) },
              { $inc: { students: 1 } }
            );

            console.log(`Enrollment created for user ${data.meta.user_id} in course ${data.meta.course_id}`);
          }
        }

        // Update payment initialization status
        await db.collection("payment_initializations").updateOne(
          { txRef: data.tx_ref },
          {
            $set: {
              status: "successful",
              transactionId: data.id.toString(),
              webhookProcessedAt: new Date()
            }
          }
        );
      }
    } else if (event === 'charge.failed') {
      // Payment failed
      await db.collection("payment_initializations").updateOne(
        { txRef: data.tx_ref },
        {
          $set: {
            status: "failed",
            failureReason: data.status,
            webhookProcessedAt: new Date()
          }
        }
      );

      console.log(`Payment failed for transaction ${data.tx_ref}: ${data.status}`);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}

// Handle GET requests for webhook testing
export async function GET() {
  return NextResponse.json({
    message: "Flutterwave webhook endpoint",
    status: "active"
  });
}