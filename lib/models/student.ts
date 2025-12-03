import { ObjectId } from "mongodb";

export interface Student {
  _id?: ObjectId;
  username: string;
  email: string;
  password: string;
  role: 'student';
  profile: {
    firstName?: string;
    lastName?: string;
    avatar?: string;
    bio?: string;
    phone?: string;
    country?: string;
    dateOfBirth?: Date;
  };
  preferences: {
    notifications: boolean;
    emailUpdates: boolean;
    language: string;
  };
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
}