export type StudentType = {
  _id?: string;
  srNo: number | "";

  className: string;
  section: string;
  session: string;

  firstName: string;
  lastName: string;
  gender: string;

  dob: string;
  dobInWords: string;
  age: string;

  bloodGroup: string;
  religion: string;
  casteCategory: string;

  motherName: string;
  fatherName: string;

  motherNationality: string;
  fatherNationality: string;

  fatherOccupation: string;
  motherOccupation: string;

  motherMobileNumber: string;
  fatherMobileNumber: string;

  motherPermanentAddress: string;
  fatherPermanentAddress: string;

  officeAddress: string;

  annualIncome: number | "";

  localGurdianName: string;
  localGurdianAddress: string;

  lastSchoolName: string;
  lastSchoolAddress: string;

  isCbse: string;
  otherBoard: string;

  lastResult: string;
  percentage: string;

  subjectOffered: string[];

  motherTongue: string;
  homeTown: string;

  userId: string;
  classId: string;

  notes: string;

  photo: File | null;

  isActive: boolean;
};

export interface FeePayment {
  transactionId: string;
  amount: null | number;
  paymentDateTime: string;
  feeType: "tuition" | "transport" | "both" | "";
  feeMonths: string[];
  paymentMode: "upi" | "bank transfer" | "cash" | "";
  remarks: string;
}

export interface StudentPortalState {
  studentProfile: StudentType;
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
  viewStudentDetail: (userId: string) => Promise<void>;

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
    }
  | {
      type: "SET_STUDENT_PROFILE";
      payload: any;
    };
