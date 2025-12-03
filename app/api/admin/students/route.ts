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

    // Fetch students with their enrollments
    const [studentsData, enrollmentsData] = await Promise.all([
      db.collection("users").find({ role: "student" }).toArray(),
      db.collection("enrollments").find({}).toArray(),
    ]);

    // Fetch course details for enrollments
    const courseIds = [
      ...new Set(enrollmentsData.map((e: any) => e.courseId.toString())),
    ];
    const coursesData =
      courseIds.length > 0
        ? await db
            .collection("courses")
            .find({ _id: { $in: courseIds } })
            .toArray()
        : [];

    const coursesMap = coursesData.reduce((acc: any, course) => {
      acc[course._id.toString()] = course;
      return acc;
    }, {});

    // Combine student data with enrollment and course info
    const enrichedStudents = studentsData.map((student: any) => {
      const studentEnrollments = enrollmentsData.filter(
        (e: any) => e.userId.toString() === student._id.toString()
      );

      const enrichedEnrollments = studentEnrollments.map((enrollment: any) => ({
        ...enrollment,
        courseId: coursesMap[enrollment.courseId.toString()] || {
          title: "Unknown Course",
        },
      }));

      const totalSpent = enrichedEnrollments.reduce(
        (total, enrollment) => total + (enrollment.courseId as any).price,
        0
      );

      const completedCourses = enrichedEnrollments.filter(
        (e: any) => e.completedAt
      ).length;
      const totalCourses = enrichedEnrollments.length;
      const completionRate =
        totalCourses > 0
          ? Math.round((completedCourses / totalCourses) * 100)
          : 0;

      return {
        ...student,
        enrollments: enrichedEnrollments,
        totalSpent,
        totalCourses,
        completionRate,
      };
    });

    return NextResponse.json({
      students: enrichedStudents,
      enrollments: enrollmentsData,
    });
  } catch (error) {
    console.error("Error fetching students:", error);
    return NextResponse.json(
      { error: "Failed to fetch students" },
      { status: 500 }
    );
  }
}