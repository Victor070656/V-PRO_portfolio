import clientPromise from "./mongodb";
import { Course } from "./models/course";

export async function initializeDatabase() {
  const client = await clientPromise;
  const db = client.db();

  try {
    // Create indexes for better performance
    await db.collection("courses").createIndex({ title: "text", description: "text" });
    await db.collection("courses").createIndex({ category: 1 });
    await db.collection("courses").createIndex({ isPublished: 1 });
    await db.collection("courses").createIndex({ createdAt: -1 });

    await db.collection("enrollments").createIndex({ userId: 1, courseId: 1 }, { unique: true });
    await db.collection("enrollments").createIndex({ userId: 1 });
    await db.collection("enrollments").createIndex({ enrolledAt: -1 });

    await db.collection("progress").createIndex({ userId: 1, courseId: 1, lessonId: 1 }, { unique: true });
    await db.collection("progress").createIndex({ userId: 1, courseId: 1 });

    await db.collection("payments").createIndex({ userId: 1 });
    await db.collection("payments").createIndex({ paymentId: 1 }, { unique: true });
    await db.collection("payments").createIndex({ createdAt: -1 });

    console.log("Database indexes created successfully");
  } catch (error) {
    console.error("Error creating indexes:", error);
  }
}

export async function createSampleCourses() {
  const client = await clientPromise;
  const db = client.db();

  try {
    // Check if courses already exist
    const existingCourses = await db.collection("courses").countDocuments();
    if (existingCourses > 0) {
      console.log("Courses already exist, skipping sample data creation");
      return;
    }

    const sampleCourses: Course[] = [
      {
        title: "Complete Next.js Development Course",
        description: "Learn Next.js from scratch and build modern, full-stack web applications with the React framework. This comprehensive course covers everything from basic concepts to advanced deployment strategies.",
        thumbnail: "/images/courses/nextjs-course.jpg",
        category: "Web Development",
        price: 89.99,
        originalPrice: 199.99,
        duration: "42 hours",
        level: "intermediate",
        language: "English",
        students: 0,
        rating: 4.7,
        reviews: 0,
        lessons: [
          {
            title: "Introduction to Next.js",
            description: "Get started with Next.js fundamentals and understand the ecosystem",
            videoUrl: "https://example.com/video1",
            duration: 45,
            order: 1,
            isPublished: true,
            resources: [
              {
                title: "Next.js Documentation",
                url: "https://nextjs.org/docs",
                type: "link"
              }
            ]
          },
          {
            title: "Setting Up Your Development Environment",
            description: "Install and configure Next.js for optimal development",
            videoUrl: "https://example.com/video2",
            duration: 30,
            order: 2,
            isPublished: true
          },
          {
            title: "Understanding the App Router",
            description: "Master the new App Router in Next.js 13+",
            videoUrl: "https://example.com/video3",
            duration: 60,
            order: 3,
            isPublished: true
          }
        ],
        requirements: [
          "Basic knowledge of JavaScript and React",
          "Node.js and npm installed",
          "Familiarity with web development concepts"
        ],
        objectives: [
          "Build full-stack applications with Next.js",
          "Understand server-side rendering and static generation",
          "Implement authentication and database integration",
          "Deploy Next.js applications to production"
        ],
        instructor: {
          name: "John Doe",
          bio: "Full-stack developer with 8+ years of experience in React and Next.js. I've worked with startups and Fortune 500 companies to build scalable web applications.",
          expertise: ["React", "Next.js", "TypeScript", "Node.js"],
          image: "/images/instructors/john-doe.jpg"
        },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "MongoDB Database Masterclass",
        description: "Master MongoDB from basics to advanced concepts. Learn how to design schemas, optimize performance, and implement real-world database solutions.",
        thumbnail: "/images/courses/mongodb-course.jpg",
        category: "Database",
        price: 79.99,
        originalPrice: 179.99,
        duration: "38 hours",
        level: "beginner",
        language: "English",
        students: 0,
        rating: 4.8,
        reviews: 0,
        lessons: [
          {
            title: "Introduction to NoSQL and MongoDB",
            description: "Understanding NoSQL concepts and MongoDB fundamentals",
            videoUrl: "https://example.com/mongo-video1",
            duration: 50,
            order: 1,
            isPublished: true
          },
          {
            title: "Database Design and Schema Modeling",
            description: "Designing efficient MongoDB schemas",
            videoUrl: "https://example.com/mongo-video2",
            duration: 45,
            order: 2,
            isPublished: true
          }
        ],
        requirements: [
          "Basic understanding of databases",
          "JavaScript knowledge helpful but not required"
        ],
        objectives: [
          "Design MongoDB schemas",
          "Write complex queries and aggregations",
          "Optimize database performance",
          "Implement scaling strategies"
        ],
        instructor: {
          name: "Jane Smith",
          bio: "Database architect with 10+ years of experience designing scalable database solutions for enterprise applications.",
          expertise: ["MongoDB", "PostgreSQL", "Database Design", "Performance Optimization"],
          image: "/images/instructors/jane-smith.jpg"
        },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "TypeScript Fundamentals",
        description: "Learn TypeScript from the ground up. This free course covers all the essential concepts you need to start writing type-safe JavaScript applications.",
        thumbnail: "/images/courses/typescript-course.jpg",
        category: "Programming",
        price: 0,
        duration: "25 hours",
        level: "beginner",
        language: "English",
        students: 0,
        rating: 4.9,
        reviews: 0,
        lessons: [
          {
            title: "Introduction to TypeScript",
            description: "Why TypeScript and basic type system",
            videoUrl: "https://example.com/ts-video1",
            duration: 35,
            order: 1,
            isPublished: true
          },
          {
            title: "Basic Types and Interfaces",
            description: "Understanding types, interfaces, and type inference",
            videoUrl: "https://example.com/ts-video2",
            duration: 40,
            order: 2,
            isPublished: true
          }
        ],
        requirements: [
          "Basic JavaScript knowledge"
        ],
        objectives: [
          "Understand TypeScript's type system",
          "Write type-safe JavaScript code",
          "Use interfaces and generics effectively",
          "Configure TypeScript projects"
        ],
        instructor: {
          name: "Mike Johnson",
          bio: "TypeScript enthusiast and educator passionate about helping developers write better, more maintainable code.",
          expertise: ["TypeScript", "JavaScript", "React", "Node.js"],
          image: "/images/instructors/mike-johnson.jpg"
        },
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const result = await db.collection("courses").insertMany(sampleCourses);
    console.log(`Created ${result.insertedCount} sample courses`);
  } catch (error) {
    console.error("Error creating sample courses:", error);
  }
}

export async function createAdminUser() {
  const client = await clientPromise;
  const db = client.db();

  try {
    // Check if admin user already exists
    const existingAdmin = await db.collection("users").findOne({ username: "admin" });
    if (existingAdmin) {
      console.log("Admin user already exists");
      return;
    }

    // Create admin user
    const adminUser = {
      username: "admin",
      password: "admin123", // In production, use proper password hashing
      email: "admin@vpro.com",
      role: "admin",
      name: "Administrator",
      createdAt: new Date(),
      updatedAt: new Date()
    };

    await db.collection("users").insertOne(adminUser);
    console.log("Admin user created successfully");
  } catch (error) {
    console.error("Error creating admin user:", error);
  }
}