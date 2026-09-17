export interface FeePayment {
  transactionId: string;
  amount: number;
  paymentDateTime: string;
  feeType: "tuition" | "transport" | "";
  feeMonths: string[];
  paymentMode: "upi" | "bank transfer" | "cash" | "";
  remarks: string;
}

export interface StudentPortalState {
  loading: boolean;

  feePayment: FeePayment;

  feePaymentList: any[];

  error: string | null;
  success: string | null;
}
export interface StudentPortalContextType {
  state: StudentPortalState;

  handleFeePayChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  handleFeePayMonthChange: (month: string) => void;

  handleFeePaySubmit: (e: any, userId: string) => Promise<void>;

  getFeePaymentList: (userId: string) => Promise<void>;

  resetFeeForm: () => void;
}

export type StudentPortalAction =
  | {
      type: "HANDLE_FEE_PAY_CHANGE";
      payload: {
        name: keyof FeePayment;
        value: string;
      };
    }
  | {
      type: "HANDLE_FEE_PAY_MONTH_CHANGE";
      payload: string;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_SUBMITTING";
      payload: boolean;
    }
  | {
      type: "SET_FEE_PAY_LIST";
      payload: any[];
    }
  | {
      type: "SET_SUCCESS";
      payload: string | null;
    }
  | {
      type: "RESET_FEE_FORM";
    };
