declare module 'flutterwave-node-v3' {
  class Flutterwave {
    constructor(publicKey: string, secretKey: string);

    Charge: {
      payment(data: any): Promise<{
        status: string;
        data?: {
          link: string;
          tx_ref: string;
        };
        message?: string;
      }>;
    };

    Transaction: {
      verify(params: { id: string }): Promise<{
        status: string;
        data?: any;
        message?: string;
      }>;

      find(params: { id: string }): Promise<{
        status: string;
        data?: any;
        message?: string;
      }>;
    };
  }

  export = Flutterwave;
}