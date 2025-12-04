"use client";

import { useState } from "react";
import { useSession, signIn } from "next-auth/react";
import { Course } from "@/lib/models/course";
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/lib/utils/currency";

interface BuyButtonProps {
  course: Course;
  isEnrolled?: boolean;
}

export default function BuyButton({ course, isEnrolled }: BuyButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePurchase = async () => {
    // Check if user is authenticated
    if (!session) {
      signIn();
      return;
    }

    // Check if already enrolled
    if (isEnrolled) {
      router.push(`/courses/${course._id}`);
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Initialize payment with Flutterwave
      const paymentResponse = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseId: course._id,
          paymentMethod: "flutterwave",
        }),
      });

      if (!paymentResponse.ok) {
        const errorData = await paymentResponse.json();
        throw new Error(errorData.error || "Payment initialization failed");
      }

      const paymentData = await paymentResponse.json();

      // Handle free courses
      if (paymentData.freeCourse) {
        // Create enrollment directly for free courses
        const enrollmentResponse = await fetch("/api/enrollments", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseId: course._id,
            paymentId: "free_course", // Special marker for free courses
          }),
        });

        if (!enrollmentResponse.ok) {
          const errorData = await enrollmentResponse.json();
          throw new Error(errorData.error || "Enrollment failed");
        }

        // Redirect to course page
        router.push(`/courses/${course._id}/payment/success`);
      } else if (paymentData.success && paymentData.paymentUrl) {
        // Redirect to Flutterwave payment page
        window.location.href = paymentData.paymentUrl;
      } else {
        throw new Error(paymentData.error || "Payment initialization failed");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setIsLoading(false);
    }
  };

  // If already enrolled, show "Continue Learning" button
  if (isEnrolled) {
    return (
      <button
        onClick={() => router.push(`/courses/${course._id}/learn`)}
        className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:-translate-y-1 flex items-center justify-center gap-3"
      >
        <CheckCircle2 className="w-6 h-6" />
        <span>Continue Learning</span>
      </button>
    );
  }

  // Guest user - Disabled
  if (!session) {
    return (
      <button
        disabled
        className="w-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-4 px-6 rounded-2xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-3"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>Login to Enroll</span>
      </button>
    );
  }

  // Admin user - Disabled
  // Assuming role is available on session.user, casting to any to avoid TS errors if types aren't updated
  if ((session.user as any).role === 'admin') {
    return (
      <button
        disabled
        className="w-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400 py-4 px-6 rounded-2xl font-bold text-lg cursor-not-allowed flex items-center justify-center gap-3"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>Admin View</span>
      </button>
    );
  }

  // Free course button
  if (course.price === 0) {
    return (
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="group w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-green-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Enrolling...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="w-6 h-6" />
            <span>Enroll for Free</span>
          </>
        )}
      </button>
    );
  }

  // Paid course button
  return (
    <div>
      <button
        onClick={handlePurchase}
        disabled={isLoading}
        className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-6 h-6 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : (
          <>
            <ShoppingCart className="w-6 h-6" />
            <span>Enroll Now - {formatPrice(course.price)}</span>
          </>
        )}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
      )}
    </div>
  );
}
