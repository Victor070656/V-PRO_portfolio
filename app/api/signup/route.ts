import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { Student } from '@/lib/models/student';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      phone,
      country,
      dateOfBirth,
    } = body;

    // Validate required fields
    if (!username || !email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate password length
    if (password.length < 8) {
      return NextResponse.json(
        { error: 'Password must be at least 8 characters long' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db();

    // Check if username already exists in students collection
    const existingUsername = await db
      .collection('students')
      .findOne({ username: username.toLowerCase() });

    if (existingUsername) {
      return NextResponse.json(
        { error: 'Username already taken' },
        { status: 409 }
      );
    }

    // Check if email already exists in students collection
    const existingEmail = await db
      .collection('students')
      .findOne({ email: email.toLowerCase() });

    if (existingEmail) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Create new student
    const newStudent: Student = {
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password: password, // In production, use bcrypt to hash passwords
      role: 'student',
      profile: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        phone: phone?.trim() || undefined,
        country: country?.trim() || undefined,
        dateOfBirth: dateOfBirth ? new Date(dateOfBirth) : undefined,
      },
      preferences: {
        notifications: true,
        emailUpdates: true,
        language: 'English',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection('students')
      .insertOne(newStudent);

    if (!result.insertedId) {
      return NextResponse.json(
        { error: 'Failed to create student account' },
        { status: 500 }
      );
    }

    // Remove password from response
    const { password: _, ...studentWithoutPassword } = newStudent;

    return NextResponse.json({
      success: true,
      message: 'Student account created successfully',
      student: {
        _id: result.insertedId,
        ...studentWithoutPassword,
      },
    });

  } catch (error) {
    console.error('Student signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET() {
  return NextResponse.json(
    { error: 'Method not allowed' },
    { status: 405 }
  );
}
