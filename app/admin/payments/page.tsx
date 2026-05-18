"use client";

import { useEffect, useState } from "react";
import { CheckCircle, Clock, CreditCard, DollarSign, Search, XCircle } from "lucide-react";
import { formatPrice } from "@/lib/utils/currency";

interface Payment {
  _id: string;
  paymentId: string;
  amount: number;
  status: string;
  paymentMethod: string;
  studentName: string;
  studentEmail: string;
  courseTitle: string;
  createdAt: string;
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const res = await fetch("/api/admin/payments");
      if (res.ok) {
        const data = await res.json();
        setPayments(data.payments || []);
      }
    } catch (error) {
      console.error("Failed to fetch payments:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(
    (payment) =>
      payment.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.studentEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.courseTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.paymentId?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalRevenue = payments
    .filter((p) => p.status === "successful")
    .reduce((sum, p) => sum + p.amount, 0);
  const successfulPayments = payments.filter((p) => p.status === "successful").length;
  const pendingPayments = payments.filter((p) => p.status === "pending").length;

  const statusIcon = (status: string) => {
    if (status === "successful") return <CheckCircle className="w-4 h-4 text-green-300" />;
    if (status === "failed") return <XCircle className="w-4 h-4 text-red-300" />;
    return <Clock className="w-4 h-4 text-yellow-300" />;
  };

  return (
    <div className="space-y-6">
      <section className="arch-panel p-8">
        <p className="arch-kicker mb-3">Finance</p>
        <h1 className="arch-heading-md">Payments</h1>
        <p className="text-muted-foreground mt-2">
          Track payment status and revenue by course.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="arch-panel p-5">
          <DollarSign className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Total Revenue</p>
          <p className="text-2xl font-semibold">{formatPrice(totalRevenue)}</p>
        </div>
        <div className="arch-panel p-5">
          <CheckCircle className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Successful</p>
          <p className="text-2xl font-semibold">{successfulPayments}</p>
        </div>
        <div className="arch-panel p-5">
          <Clock className="h-5 w-5 text-primary mb-2" />
          <p className="arch-kicker">Pending</p>
          <p className="text-2xl font-semibold">{pendingPayments}</p>
        </div>
      </section>

      <section className="arch-panel p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search payments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="arch-input pl-10"
          />
        </div>
      </section>

      <section className="arch-panel overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-muted-foreground">Loading payments...</div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-10 text-center text-muted-foreground">
            {searchTerm ? "No matching payments." : "No payments yet."}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-border">
                <tr className="text-left">
                  <th className="px-5 py-3 arch-kicker">Payment</th>
                  <th className="px-5 py-3 arch-kicker">Student</th>
                  <th className="px-5 py-3 arch-kicker">Course</th>
                  <th className="px-5 py-3 arch-kicker">Amount</th>
                  <th className="px-5 py-3 arch-kicker">Status</th>
                  <th className="px-5 py-3 arch-kicker">Date</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="border-b border-border/70 last:border-none">
                    <td className="px-5 py-4 font-mono text-xs text-muted-foreground">
                      {payment.paymentId?.slice(0, 12)}...
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium">{payment.studentName || "Unknown"}</p>
                      <p className="text-xs text-muted-foreground">{payment.studentEmail}</p>
                    </td>
                    <td className="px-5 py-4">{payment.courseTitle}</td>
                    <td className="px-5 py-4 font-semibold">{formatPrice(payment.amount)}</td>
                    <td className="px-5 py-4">
                      <span className="inline-flex items-center gap-2 text-sm">
                        {statusIcon(payment.status)}
                        {payment.status}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
