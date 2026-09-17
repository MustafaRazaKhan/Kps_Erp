import {
  StudentPortalAction,
  StudentPortalState,
} from "../types/student-portal.type";

const studentPortalReducer = (
  state: StudentPortalState,
  action: StudentPortalAction,
): StudentPortalState => {
  switch (action.type) {
    /* =====================================================
       FEE FORM CHANGE
    ====================================================== */

    case "HANDLE_FEE_PAY_CHANGE":
      return {
        ...state,
        feePayment: {
          ...state.feePayment,
          [action.payload.name]: action.payload.value,
        },
      };

    /* =====================================================
       FEE MONTH CHANGE
    ====================================================== */

    case "HANDLE_FEE_PAY_MONTH_CHANGE": {
      const month = action.payload;

      const alreadySelected = state.feePayment.feeMonths.includes(month);

      return {
        ...state,
        feePayment: {
          ...state.feePayment,
          feeMonths: alreadySelected
            ? state.feePayment.feeMonths.filter((item) => item !== month)
            : [...state.feePayment.feeMonths, month],
        },
      };
    }

    /* =====================================================
       LOADING
    ====================================================== */

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    /* =====================================================
       SUBMITTING
    ====================================================== */

    /* =====================================================
       FEE PAYMENTS
    ====================================================== */

    // case "SET_FEE_PAYMENTS":
    //   return {
    //     ...state,
    //     feePaymentList: action.payload,
    //   };

    /* =====================================================
       ERROR
    ====================================================== */

    /* =====================================================
       SUCCESS
    ====================================================== */

    case "SET_SUCCESS":
      return {
        ...state,
        success: action.payload,
      };

    /* =====================================================
       RESET FEE FORM
    ====================================================== */

    case "RESET_FEE_FORM":
      return {
        ...state,
        feePayment: {
          transactionId: "",
          paymentDateTime: "",
          feeType: "",
          feeMonths: [],
          paymentMode: "",
          remarks: "",
          amount: 0,
        },
      };

    default:
      return state;
  }
};

export default studentPortalReducer;
