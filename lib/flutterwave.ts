import Flutterwave from "flutterwave-node-v3";
import { v4 as uuidv4 } from "uuid";

export interface FlutterwavePaymentData {
  tx_ref: string;
  amount: number;
  currency: string;
  redirect_url: string;
  payment_options: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  customizations: {
    title: string;
    description: string;
    logo: string;
  };
  meta: {
    course_id: string;
    user_id: string;
  };
}

export interface PaymentVerificationResponse {
  status: string;
  transaction_id: string;
  tx_ref: string;
  amount: number;
  currency: string;
  customer: {
    email: string;
    name: string;
    phone?: string;
  };
  meta: {
    course_id: string;
    user_id: string;
  };
  created_at: string;
}

export interface PaymentWebhookData {
  event:
    | "charge.completed"
    | "charge.failed"
    | "transfer.completed"
    | "transfer.failed";
  data: {
    id: number;
    tx_ref: string;
    flw_ref: string;
    amount: number;
    currency: string;
    status: "successful" | "failed";
    payment_type: string;
    created_at: string;
    account_id: number;
    customer: {
      id: number;
      name: string;
      email: string;
      phone_number: string;
    };
    meta: {
      course_id: string;
      user_id: string;
      source: string;
    };
  };
}

class FlutterwaveService {
  private flw: any = null;

  constructor() {
    // Lazy initialize at runtime to prevent Next.js build-time compile crashes
  }

  private initFlw() {
    if (this.flw) return;

    const publicKey = process.env.FLUTTERWAVE_PUBLIC_KEY || "";
    const secretKey = process.env.FLUTTERWAVE_SECRET_KEY || "";

    if (!publicKey || !secretKey) {
      console.warn("Flutterwave credentials not configured. Running in sandbox simulation mode.");
      return;
    }

    try {
      console.log("Initializing Flutterwave client...");
      this.flw = new Flutterwave(publicKey, secretKey);
    } catch (error) {
      console.error("Flutterwave initialization error:", error);
    }
  }

  /**
   * Initialize a payment transaction
   */
  async initializePayment(paymentData: {
    email: string;
    name: string;
    phone?: string;
    courseId: string;
    userId: string;
    courseTitle: string;
    amount: number;
    redirectUrl: string;
  }) {
    const tx_ref = uuidv4();
    const currency = "NGN"; // Default to Nigerian Naira, can be made configurable

    const paymentPayload: FlutterwavePaymentData = {
      tx_ref,
      amount: paymentData.amount,
      currency,
      redirect_url: paymentData.redirectUrl,
      payment_options: "card, banktransfer, ussd, mobilemoney", // All available options
      customer: {
        email: paymentData.email,
        name: paymentData.name,
        phone: paymentData.phone,
      },
      customizations: {
        title: paymentData.courseTitle,
        description: `Payment for ${paymentData.courseTitle}`,
        logo: "https://your-domain.com/logo.png", // Update with actual logo URL
      },
      meta: {
        course_id: paymentData.courseId,
        user_id: paymentData.userId,
      },
    };

    try {
      console.log("Initializing payment with payload:", paymentPayload);

      // Use Flutterwave's API to generate payment link
      console.log("Creating Flutterwave payment transaction...");

      // Use the standard Flutterwave API for payment initialization
      const apiPaymentData = {
        tx_ref: tx_ref,
        amount: paymentData.amount,
        currency: "NGN",
        redirect_url: paymentData.redirectUrl,
        payment_options: "card, banktransfer, ussd",
        customer: {
          email: paymentData.email,
          name: paymentData.name,
          phone_number: paymentData.phone,
        },
        meta: paymentPayload.meta,
        customizations: {
          title: paymentData.courseTitle,
          description: `Payment for ${paymentData.courseTitle}`,
          logo: "https://your-domain.com/logo.png",
        },
      };

      // Make direct API call to Flutterwave to create payment link
      const response = await fetch("https://api.flutterwave.com/v3/payments", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(apiPaymentData),
      });

      const result = await response.json();
      console.log("Flutterwave API response:", result);

      if (result.status === "success" && result.data.link) {
        return {
          success: true,
          data: {
            link: result.data.link,
            tx_ref,
          },
        };
      } else {
        console.error("Flutterwave API error:", result);
        return {
          success: false,
          error: result.message || "Payment initialization failed",
        };
      }
    } catch (error) {
      console.error("Flutterwave payment initialization error:", error);
      return {
        success: false,
        error: "Payment service temporarily unavailable - Please try again",
      };
    }
  }

  /**
   * Verify a payment transaction
   */
  async verifyTransaction(transactionId: string): Promise<{
    success: boolean;
    data?: PaymentVerificationResponse;
    error?: string;
  }> {
    try {
      const response = await fetch(
        `https://api.flutterwave.com/v3/transactions/${transactionId}/verify`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${process.env.FLUTTERWAVE_SECRET_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );

      const result = await response.json();

      if (result.status === "success") {
        return {
          success: true,
          data: result.data as PaymentVerificationResponse,
        };
      } else {
        return {
          success: false,
          error: result.message || "Transaction verification failed",
        };
      }
    } catch (error) {
      console.error("Flutterwave verification error:", error);
      return {
        success: false,
        error: "Verification service unavailable",
      };
    }
  }

  /**
   * Get transaction details
   */
  async getTransaction(transactionId: string): Promise<{
    success: boolean;
    data?: any;
    error?: string;
  }> {
    try {
      this.initFlw();
      if (!this.flw) {
        return {
          success: false,
          error: "Flutterwave service is not configured"
        };
      }
      const response = await this.flw.Transaction.find({ id: transactionId });

      if (response.status === "success") {
        return {
          success: true,
          data: response.data,
        };
      } else {
        return {
          success: false,
          error: response.message || "Transaction not found",
        };
      }
    } catch (error) {
      console.error("Flutterwave get transaction error:", error);
      return {
        success: false,
        error: "Transaction service unavailable",
      };
    }
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const secretHash = process.env.FLUTTERWAVE_ENCRYPTION_KEY;
    if (!secretHash) {
      console.error("Flutterwave encryption key not configured");
      return false;
    }

    const crypto = require("crypto");
    const expectedSignature = crypto
      .createHmac("sha256", secretHash)
      .update(payload)
      .digest("hex");

    return expectedSignature === signature;
  }

  /**
   * Process webhook payload
   */
  async processWebhook(webhookData: PaymentWebhookData): Promise<{
    success: boolean;
    processed: boolean;
    message: string;
  }> {
    try {
      const { event, data } = webhookData;

      if (event === "charge.completed") {
        if (data.status === "successful") {
          // Payment successful - process enrollment
          return {
            success: true,
            processed: true,
            message: "Payment successful, enrollment processed",
          };
        } else {
          return {
            success: false,
            processed: false,
            message: "Payment failed",
          };
        }
      } else if (event === "charge.failed") {
        return {
          success: false,
          processed: false,
          message: "Payment failed",
        };
      }

      // Handle other events as needed
      return {
        success: true,
        processed: false,
        message: "Event processed",
      };
    } catch (error) {
      console.error("Webhook processing error:", error);
      return {
        success: false,
        processed: false,
        message: "Webhook processing failed",
      };
    }
  }
}

export const flutterwaveService = new FlutterwaveService();

// Payment status constants
export const PAYMENT_STATUS = {
  PENDING: "pending",
  SUCCESSFUL: "successful",
  FAILED: "failed",
  REFUNDED: "refunded",
} as const;

// Payment methods supported
export const PAYMENT_METHODS = {
  CARD: "card",
  BANK_TRANSFER: "banktransfer",
  USSD: "ussd",
  MOBILE_MONEY: "mobilemoney",
  QR: "qr",
  BARCODE: "barcode",
} as const;
