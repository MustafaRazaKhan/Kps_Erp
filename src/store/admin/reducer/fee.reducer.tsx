import { FeeAction, FeeState } from "../types/fee.type";

const feeReducer = (state: FeeState, action: FeeAction): FeeState => {
  switch (action.type) {
    // ==========================
    // Normal Input
    // ==========================
    case "HANDLE_CHANGE":
      return {
        ...state,
        feeObj: {
          ...state.feeObj,
          [action.payload.name]: action.payload.value,
        },
      };

    // ==========================
    // Monthly Fee Input
    // ==========================
    case "HANDLE_MONTHLY_FEE":
      return {
        ...state,
        monthlyObj: {
          ...state.monthlyObj,
          [action.payload.name]: action.payload.value,
        },
      };

    // ==========================
    // Add Monthly Fee
    // ==========================
    case "HANDLE_MONTHLY_SUBMIT":
      return {
        ...state,
        monthList: [...state.monthList, action.payload],
      };

    // ==========================
    // Get All Fee Structures
    // ==========================
    case "SET_FEE_LIST":
      return {
        ...state,
        feeList: action.payload,
        loading: false,
      };

    // ==========================
    // Get Single Fee Structure
    // ==========================
    case "SET_FEE_DETAILS":
      return {
        ...state,
        feeDetails: action.payload,
        loading: false,
      };

    // ==========================
    // Loading
    // ==========================
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "RESET_MONTHLIST":
      return {
        ...state,
        monthList: [],
      };

    default:
      return state;
  }
};

export default feeReducer;
