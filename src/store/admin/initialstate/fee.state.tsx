import { FeeState } from "../types/fee.type";
// feeCategory: string;
//   monthlyFee: [];

//   admissionFee: string;
//   annualFee: string;
//   examinationFee: string;
//   registrationFee: string;
//   securityFee: string;

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
};

export default initialState;
