import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { MongoClient } from "mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db();

    // Create admin user
    const existingAdmin = await db.collection('users').findOne({ username: 'admin' });
    if (!existingAdmin) {
      const adminUser = {
        username: 'admin',
        password: 'admin123', // In production, use proper password hashing
        email: 'admin@vpro.com',
        role: 'admin',
        name: 'Administrator',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      await db.collection('users').insertOne(adminUser);
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }

    // Check students
    const students = await db.collection('students').find({}).toArray();
    
    return NextResponse.json({
      success: true,
      message: "Database checked/initialized",
      adminExists: !!existingAdmin,
      studentCount: students.length,
      students: students.map(s => ({ username: s.username, email: s.email })) // Return basic info to verify
    });

  } catch (error) {
    console.error("Init DB error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
