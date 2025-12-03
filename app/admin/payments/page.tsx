"use client";

import { useState, useEffect } from "react";
import { Search, DollarSign, TrendingUp, Users, Clock, CreditCard, Shield, CheckCircle, XCircle, Eye, ArrowUpDown } from "lucide-react";
import Header from "@/components/admin/Header";

interface Payment {
  _id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'successful' | 'failed' | 'refunded';
  paymentMethod: string;
  txRef: string;
  flwRef?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  user?: {
    name?: string;
    email?: string;
  username?: string;
  };
  course?: {
    title: string;
    category: string;
    level: string;
    price: number;
    thumbnail?: string;
  };
}

export default function PaymentsManagementPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [filteredPayments, setFilteredPayments] = useState<Payment[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterMethod, setFilterMethod] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);

  // Fetch payments data
  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await fetch("/api/admin/payments");

      if (!response.ok) {
        if (response.status === 401) {
          setError("Access denied");
        } else {
          setError("Failed to fetch payments");
        }
        return;
      }

      const paymentsData = await response.json();

      setPayments(paymentsData);
      setFilteredPayments(paymentsData);
      setIsLoading(false);
    } catch (err) {
      console.error("Error fetching payments:", err);
      setError("Failed to fetch payments");
      setIsLoading(false);
    }
  };

  // Filter payments based on search and filters
  useEffect(() => {
    let filtered = payments;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(payment =>
        payment.user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        payment.txRef?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus) {
      filtered = filtered.filter(payment => payment.status === filterStatus);
    }

    // Payment method filter
    if (filterMethod) {
      filtered = filtered.filter(payment => payment.paymentMethod.toLowerCase().includes(filterMethod.toLowerCase()));
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "createdAt":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "amount":
          return b.amount - a.amount;
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    setFilteredPayments(filtered);
  }, [payments, searchTerm, filterStatus, filterMethod, sortBy]);

  const paymentMethods = [
    "card",
    "mobile_money",
    "bank_transfer",
    "ussd",
    "qr",
    "barcode"
  ];

  const paymentStatuses = [
    "pending",
    "successful",
    "failed",
    "refunded"
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "successful":
        return "text-green-600 dark:text-green-400";
      case "pending":
        return "text-yellow-600 dark:text-yellow-400";
      case "failed":
        return "text-red-600 dark:text-red-400";
      case "refunded":
        return "text-blue-600 dark:text-blue-400";
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "successful":
        return CheckCircle;
      case "pending":
        return Clock;
      case "failed":
        return XCircle;
      case "refunded":
        return DollarSign;
      default:
        return Shield;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <Header />

      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-[var(--text-primary)]">Payment Management</h1>
            <div className="flex gap-4">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                      <DollarSign className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Total Revenue</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₦{payments
                          .filter(p => p.status === 'successful')
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">This Month</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₦{payments
                          .filter(p => p.status === 'successful' && new Date(p.createdAt).getMonth() === new Date().getMonth())
                          .reduce((sum, p) => sum + p.amount, 0)
                          .toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Active Students</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {[...new Set(payments
                          .filter(p => p.status === 'successful')
                          .map((p: any) => p.userId.toString())
                        )].size
                        } students
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                  <div className="flex items-center">
                    <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
                      <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">Pending</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {payments.filter(p => p.status === 'pending').length} transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Search and Filters */}
              <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search payments..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {/* Status Filter */}
                    <div className="relative">
                      <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="appearance-none pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Statuses</option>
                        {paymentStatuses.map(status => (
                          <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
                        ))}
                      </select>
                    </div>

                    {/* Method Filter */}
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={filterMethod}
                        onChange={(e) => setFilterMethod(e.target.value)}
                        className="appearance-none pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="">All Methods</option>
                        {paymentMethods.map(method => (
                          <option key={method} value={method}>{method.replace('_', ' ').toUpperCase()}</option>
                        ))}
                      </select>
                    </div>

                    {/* Sort */}
                    <div className="relative">
                      <ArrowUpDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      >
                        <option value="createdAt">Date</option>
                        <option value="amount">Amount</option>
                        <option value="status">Status</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 p-4 rounded-lg mb-6">
                  {error}
                </div>
              )}

              {/* Payments Table */}
              <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-900">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Transaction
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Student
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Course
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Method
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-slate-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredPayments.map((payment) => (
                        <tr key={payment._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="font-medium text-gray-900 dark:text-white">
                              {payment.txRef}
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">
                              FLW Ref
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {payment.user?.name || payment.user?.username}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {payment.user?.email}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {payment.course?.title}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {payment.course?.category} • {payment.course?.level}
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <span className={`font-bold ${getStatusColor(payment.status)}`}>
                                ₦{payment.amount.toLocaleString()}
                              </span>
                              <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                                payment.status === 'successful'
                                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                  : payment.status === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                              }`}>
                                {payment.status}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(payment.status)}`}>
                              {payment.paymentMethod.replace('_', ' ').toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-1">
                              {getStatusIcon(payment.status)}
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(payment.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex gap-2">
                              <button
                                onClick={() => setSelectedPayment(payment)}
                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                              >
                                <Eye className="w-4 h-4 inline-block" />
                              </button>

                              {payment.status === 'pending' && (
                                <button className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 font-medium">
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Empty State */}
              {filteredPayments.length === 0 && !isLoading && (
                <div className="text-center py-12">
                  <div className="text-gray-500 dark:text-gray-400">
                    No payments found matching your filters.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Payment Details Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-800 rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-start p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Payment Details</h2>
              <button
                onClick={() => setSelectedPayment(null)}
                className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Transaction Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Transaction ID</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.txRef}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Flutterwave Reference</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.flwRef || 'N/A'}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        ₦{selectedPayment.amount.toLocaleString()}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Payment Method</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.paymentMethod.replace('_', ' ').toUpperCase()}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                      <div className="flex items-center gap-2">
                        <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedPayment.status)}`}>
                          {getStatusIcon(selectedPayment.status)}
                          <span className="ml-2">{selectedPayment.status.charAt(0).toUpperCase() + selectedPayment.status.slice(1)}</span>
                        </span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Created</label>
                      <div className="text-sm text-gray-900 dark:text-white">{new Date(selectedPayment.createdAt).toLocaleDateString()}</div>
                    </div>

                    {selectedPayment.completedAt && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Completed</label>
                        <div className="text-sm text-gray-900 dark:text-white">{new Date(selectedPayment.completedAt).toLocaleDateString()}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Student Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.user?.name || selectedPayment.user?.username}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.user?.email}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.user?.username}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Course Information</h3>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Course Title</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.course?.title}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.course?.category}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Level</label>
                      <div className="text-sm text-gray-900 dark:text-white">{selectedPayment.course?.level}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Price</label>
                      <div className="text-lg font-semibold text-gray-900 dark:text-white">
                        ₦{selectedPayment.course?.price?.toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}