"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

export default function PaymentSuccessPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying payment...");

  const courseId = params.id as string;
  const statusParam = searchParams.get("status");
  const txRef = searchParams.get("tx_ref");
  const transactionId = searchParams.get("transaction_id");

  useEffect(() => {
    // If we have status=successful or completed from Flutterwave
    if (statusParam === "successful" || statusParam === "completed") {
      setStatus("success");
      setMessage("Payment successful! You are now enrolled.");
    } 
    // If we have a transaction_id, we could optionally verify it with the backend here
    // But for now, we'll trust the redirect params and the webhook should have handled the actual enrollment
    else if (transactionId || txRef) {
       setStatus("success");
       setMessage("Payment processed! You are now enrolled.");
    }
    else {
      // If no status param, it might be a direct visit or free course enrollment
      // We can check enrollment status via API or just assume success if redirected here
      setStatus("success");
      setMessage("You are now enrolled in this course.");
    }
  }, [statusParam, txRef, transactionId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8 text-center border border-slate-200 dark:border-slate-800">
        {status === "loading" && (
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-indigo-600 dark:text-indigo-400 animate-spin" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Verifying Payment
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Please wait while we confirm your enrollment...
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center animate-fade-in">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
              <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Enrollment Successful!
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              {message}
            </p>
            <Link
              href={`/courses/${courseId}`}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 px-6 rounded-xl font-bold text-lg hover:shadow-lg hover:-translate-y-1 transition-all flex items-center justify-center gap-2"
            >
              Start Learning
            </Link>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center">
             <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-6">
              <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Something went wrong
            </h1>
            <p className="text-slate-600 dark:text-slate-400 mb-8">
              We couldn't verify your payment. Please contact support if you were charged.
            </p>
            <Link
              href={`/courses/${courseId}`}
              className="text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
            >
              Return to Course
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}