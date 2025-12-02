"use client";

import { useState } from "react";
import { Course } from "@/lib/models/course";
import { ShoppingCart, Loader2, CheckCircle2 } from "lucide-react";

interface BuyButtonProps {
  course: Course;
}

export default function BuyButton({ course }: BuyButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isPurchased, setIsPurchased] = useState(false);

  const handlePurchase = async () => {
    setIsLoading(true);
    // Simulate purchase
    setTimeout(() => {
      setIsLoading(false);
      setIsPurchased(true);
    }, 2000);
  };

  if (isPurchased) {
    return (
      <button
        disabled
        className="w-full py-4 px-6 rounded-2xl font-bold text-lg bg-green-500 text-white flex items-center justify-center gap-3 cursor-not-allowed"
      >
        <CheckCircle2 className="w-6 h-6" />
        <span>Enrolled Successfully!</span>
      </button>
    );
  }

  return (
    <button
      onClick={handlePurchase}
      disabled={isLoading}
      className="group w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/50 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3"
    >
      {isLoading ? (
        <>
          <Loader2 className="w-6 h-6 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          <ShoppingCart className="w-6 h-6" />
          <span>Enroll Now</span>
        </>
      )}
    </button>
  );
}
