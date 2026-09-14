import { FeeState } from "../types/fee.type";

const initialState: FeeState = {
  feeObj: {
    admissionFee: "",
    annualFee: "",
    examinationFee: "",
    registrationFee: "",
    securityFee: "",
  },
  monthlyObj: {
    monthFee: "",
    busFee: "",
  },

  feeList: [],
  monthList: [],

  loading: false,
  feeDetails: null,
};

export default initialState;
