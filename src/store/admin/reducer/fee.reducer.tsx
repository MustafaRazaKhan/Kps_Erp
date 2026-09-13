import { FeeAction, FeeState } from "../types/fee.type";

const feeReducer = (state: FeeState, action: FeeAction): FeeState => {
  switch (action.type) {
    case "HANDLE_CHANGE":
      return {
        ...state,
        feeObj: {
          ...state.feeObj,
          [action.payload.name]: action.payload.value,
        },
      };

    case "HANDLE_MONTHLY_FEE":
      return {
        ...state,
        monthlyObj: {
          ...state.monthlyObj,
          [action.payload.name]: action.payload.value,
        },
      };
    case "HANDLE_MONTHLY_SUBMIT":
      console.log(action.payload);
      return {
        ...state,
        monthList: [...state.monthList, action.payload],
      };
    case "SET_FEE_LIST":
      return {
        ...state,
        feeList: action.payload,
      };

    // case "SET_FEE_STRUCTURES":
    //   return {
    //     ...state,
    //     feeStructureList: action.payload,
    //     loading: false,
    //   };

    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default feeReducer;
