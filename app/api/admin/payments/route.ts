import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ error: "Access denied" }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db();

    // Fetch payments with user and course details
    const payments = await db
      .collection("payments")
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Get user and course details for each payment
    const userIds = [...new Set(payments.map((p: any) => p.userId.toString()))];
    const courseIds = [...new Set(payments.map((p: any) => p.courseId.toString()))];

    const [usersData, coursesData] = await Promise.all([
      userIds.length > 0
        ? db
            .collection("users")
            .find({ _id: { $in: userIds } })
            .toArray()
        : [],
      courseIds.length > 0
        ? db
            .collection("courses")
            .find({ _id: { $in: courseIds } })
            .toArray()
        : [],
    ]);

    const usersMap = usersData.reduce((acc: any, user) => {
      acc[user._id.toString()] = {
        _id: user._id,
        username: user.username,
        email: user.email,
        name: user.profile?.firstName || user.username,
      };
      return acc;
    }, {});

    const coursesMap = coursesData.reduce((acc: any, course) => {
      acc[course._id.toString()] = {
        _id: course._id,
        title: course.title,
        category: course.category,
        price: course.price,
      };
      return acc;
    }, {});

    // Enrich payments with user and course info
    const enrichedPayments = payments.map((payment: any) => ({
      ...payment,
      user: usersMap[payment.userId.toString()],
      course: coursesMap[payment.courseId.toString()],
    }));

    return NextResponse.json(enrichedPayments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}