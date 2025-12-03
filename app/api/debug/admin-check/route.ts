import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Check all users in users collection
    const adminUsers = await db.collection("users").find({}).toArray();

    // Check all users in students collection
    const studentUsers = await db.collection("students").find({}).toArray();

    return NextResponse.json({
      adminUsers: adminUsers.map(u => ({
        id: u._id,
        username: u.username,
        email: u.email,
        role: u.role
      })),
      studentUsers: studentUsers.map(u => ({
        id: u._id,
        username: u.username,
        email: u.email,
        role: u.role
      })),
      collections: {
        users: adminUsers.length,
        students: studentUsers.length
      }
    });
  } catch (error) {
    console.error("Debug error:", error);
    return NextResponse.json(
      { error: "Debug endpoint failed" },
      { status: 500 }
    );
  }
}