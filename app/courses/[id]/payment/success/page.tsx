"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Navbar from "@/components/Navbar";
import { CheckCircle2, Loader2, AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function PaymentSuccessPage() {
  const { id } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session } = useSession();

  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'processing'>('loading');
  const [error, setError] = useState("");
  const [course, setCourse] = useState<any>(null);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    const verifyPayment = async () => {
      const txRef = searchParams.get('tx_ref');
      const transactionId = searchParams.get('transaction_id');
      const status = searchParams.get('status');

      if (!txRef && !transactionId) {
        setStatus('error');
        setError('No payment information found');
        return;
      }

      setTransactionId(transactionId || txRef || '');

      try {
        // Fetch course information
        const courseResponse = await fetch(`/api/courses/${id}`);
        if (courseResponse.ok) {
          const courseData = await courseResponse.json();
          setCourse(courseData.course);
        }

        // First try public verification (doesn't require authentication)
        const publicVerifyResponse = await fetch('/api/payments/verify-public', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            transactionId: transactionId || txRef,
            txRef
          }),
        });

        const publicVerifyData = await publicVerifyResponse.json();

        if (publicVerifyResponse.ok && publicVerifyData.success) {
          setStatus('success');
          return;
        }

        // If public verification failed and we have a session, try authenticated verification
        if (session) {
          const verifyResponse = await fetch('/api/payments/verify', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              transactionId: transactionId || txRef,
              txRef
            }),
          });

          const verifyData = await verifyResponse.json();

          if (verifyResponse.ok && verifyData.success) {
            setStatus('success');
          } else {
            setStatus('error');
            setError(verifyData.error || 'Payment verification failed');
          }
        } else {
          // Payment couldn't be verified and no session - show error
          setStatus('error');
          setError('Payment verification failed. Please sign in to complete the process.');
        }
      } catch (err) {
        setStatus('error');
        setError('Unable to verify payment. Please contact support.');
      }
    };

    if (id) {
      verifyPayment();
    }
  }, [id, searchParams, session, router]);

  const handleContinue = () => {
    if (status === 'success') {
      router.push(`/courses/${id}`);
    } else {
      router.push(`/courses/${id}`);
    }
  };

  const handleRetry = () => {
    if (course) {
      // Re-initialize payment
      router.push(`/courses/${id}`);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <Loader2 className="w-16 h-16 animate-spin text-indigo-600" />
              </div>

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Verifying Your Payment
              </h1>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                Please wait while we confirm your payment details...
              </p>

              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mb-6">
                <div className="bg-indigo-600 h-2 rounded-full animate-pulse" style={{ width: '60%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Navbar />

        <div className="container mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                </div>
              </div>

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                Payment Verification Failed
              </h1>

              <p className="text-slate-600 dark:text-slate-400 mb-8">
                {error}
              </p>

              {transactionId && (
                <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-8">
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Transaction ID: <span className="font-mono font-semibold">{transactionId}</span>
                  </p>
                </div>
              )}

              <div className="flex gap-4 justify-center flex-wrap">
                <button
                  onClick={handleRetry}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Try Again
                </button>

                {error.includes('sign in') && (
                  <Link
                    href={`/signin?callbackUrl=/courses/${id}/payment/success`}
                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Sign In to Complete
                  </Link>
                )}

                <Link
                  href="/courses"
                  className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-colors"
                >
                  Browse Courses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Navbar />

      <div className="container mx-auto px-6 py-20">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
              Payment Successful!
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mb-2">
              Thank you for your purchase. You have been successfully enrolled in:
            </p>

            {course && (
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl p-6 mb-6 border border-indigo-200 dark:border-indigo-800">
                <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-100 mb-2">
                  {course.title}
                </h2>
                <p className="text-indigo-700 dark:text-indigo-300">
                  {course.category} • {course.level}
                </p>
              </div>
            )}

            {transactionId && (
              <div className="bg-slate-100 dark:bg-slate-800 rounded-xl p-4 mb-8">
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Transaction ID: <span className="font-mono font-semibold">{transactionId}</span>
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
                  Please save this transaction ID for your records.
                </p>
              </div>
            )}

            <div className="flex gap-4 justify-center">
              <button
                onClick={handleContinue}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Start Learning
              </button>

              <Link
                href="/courses"
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-medium rounded-xl transition-colors"
              >
                Browse More Courses
              </Link>
            </div>

            <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>📧 Check your email:</strong> You'll receive a confirmation email with your course access details and receipt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}