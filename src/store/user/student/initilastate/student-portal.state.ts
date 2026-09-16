import { StudentPortalState } from "../types/student-portal.type";

const initialState: StudentPortalState = {
  loading: false,

  feePayment: {
    transactionId: "",
    paymentDateTime: "",
    feeType: "",
    feeMonths: [],
    paymentMode: "",
    remarks: "",
  },

  feePaymentList: [],

  error: null,
  success: null,
};

export default initialState;
