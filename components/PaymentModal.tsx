"use client";

import { useState } from "react";
import { X, CreditCard, Smartphone, Building, Shield } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  course: any;
  onSuccess: (paymentUrl: string) => void;
}

export default function PaymentModal({ isOpen, onClose, course, onSuccess }: PaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'card' | 'mobile' | 'bank'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('/api/payments/initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          courseId: course._id,
          paymentMethod: `flutterwave_${selectedMethod}`,
        }),
      });

      const data = await response.json();

      if (data.success) {
        onSuccess(data.paymentUrl);
        onClose();
      } else {
        throw new Error(data.error || 'Payment initialization failed');
      }
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const paymentMethods = [
    {
      id: 'card',
      name: 'Card Payment',
      icon: CreditCard,
      description: 'Pay with Visa, Mastercard, or other credit/debit cards',
      color: 'from-blue-500 to-blue-600',
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      icon: Smartphone,
      description: 'Pay with mobile money services (MTN, Airtel, etc.)',
      color: 'from-green-500 to-green-600',
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building,
      description: 'Pay directly from your bank account',
      color: 'from-purple-500 to-purple-600',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Secure Payment
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Powered by Flutterwave
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>
        </div>

        {/* Course Info */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-xl flex-shrink-0">
              <img
                src={course.thumbnail || '/images/course-placeholder.jpg'}
                alt={course.title}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-slate-900 dark:text-white line-clamp-2">
                {course.title}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {course.category} • {course.level}
              </p>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Course Price:
            </span>
            <div className="text-right">
              {course.originalPrice && course.originalPrice > course.price && (
                <span className="text-sm text-slate-500 dark:text-slate-400 line-through mr-2">
                  ₦{course.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ₦{course.price.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="p-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Select Payment Method
          </h3>

          <div className="space-y-3">
            {paymentMethods.map((method) => {
              const Icon = method.icon;
              return (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id as any)}
                className={`w-full p-4 rounded-xl border-2 transition-all ${
                  selectedMethod === method.id
                    ? `border-transparent bg-gradient-to-r ${method.color} text-white shadow-lg`
                    : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    selectedMethod === method.id
                      ? 'bg-white/20'
                      : 'bg-slate-100 dark:bg-slate-700'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <div className="font-semibold">
                      {method.name}
                    </div>
                    <div className="text-sm opacity-75">
                      {method.description}
                    </div>
                  </div>
                </div>
              </button>
              );
            })}
          </div>

          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full mt-6 py-4 px-6 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-600 text-white font-semibold rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center gap-3">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Processing Payment...</span>
              </div>
            ) : (
              <span>Complete Payment - ₦{course.price.toLocaleString()}</span>
            )}
          </button>
        </div>

        {/* Security Badge */}
        <div className="px-6 pb-6">
          <div className="flex items-center justify-center gap-2 p-3 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              Secured by Flutterwave • 256-bit SSL encryption
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <div className="text-center text-xs text-slate-500 dark:text-slate-400">
            <p>By completing this purchase, you agree to our</p>
            <div className="flex items-center justify-center gap-1 mt-1">
              <a href="/terms" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Terms of Service
              </a>
              <span>and</span>
              <a href="/privacy" className="text-indigo-600 dark:text-indigo-400 hover:underline">
                Privacy Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}