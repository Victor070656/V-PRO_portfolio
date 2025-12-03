import { ObjectId } from "mongodb";

export interface Lesson {
  _id?: ObjectId;
  title: string;
  description: string;
  videoUrl?: string;
  duration: number; // in minutes
  order: number;
  isPublished: boolean;
  resources?: {
    title: string;
    url: string;
    type: 'pdf' | 'link' | 'download';
  }[];
}

export interface Course {
  _id?: ObjectId;
  title: string;
  description: string;
  thumbnail?: string;
  category: string;
  price: number;
  originalPrice?: number;
  duration?: string; // total duration in hours
  level: 'beginner' | 'intermediate' | 'advanced';
  language: string;
  students: number;
  rating: number;
  reviews: number;
  lessons: Lesson[];
  requirements: string[];
  objectives: string[];
  instructor: {
    name: string;
    bio: string;
    image?: string;
    expertise: string[];
  };
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Enrollment {
  _id?: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  enrolledAt: Date;
  completedAt?: Date;
  progress: number; // 0-100
  completedLessons: ObjectId[]; // Array of lesson IDs
  lastAccessedAt?: Date;
  certificate?: {
    issued: boolean;
    issuedAt?: Date;
    certificateUrl?: string;
  };
}

export interface Progress {
  _id?: ObjectId;
  userId: ObjectId;
  courseId: ObjectId;
  lessonId: ObjectId;
  completed: boolean;
  completedAt?: Date;
  watchTime?: number; // in minutes
  lastPosition?: number; // video position in seconds
}