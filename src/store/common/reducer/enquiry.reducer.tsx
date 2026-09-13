import { EnquiryAction, EnquiryState } from "../types/enquiry.types";

const enquiryReducer = (
  state: EnquiryState,
  action: EnquiryAction,
): EnquiryState => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: true,
      };
    case "HANDLE_CHANGE":
      return {
        ...state,
        enquiryObj: {
          ...state.enquiryObj,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_SUCCESS":
      return {
        ...state,
        loading: false,
      };
    case "SET_ENQUIRIES":
      return {
        ...state,
        enquiryList: action.payload.data,
        totalEnquiries: action.payload.totalEnquiries,
      };
    case "ENQUIRY_RESET":
      return {
        ...state,
        enquiryObj: {
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        },
      };

    default:
      return state;
  }
};

export default enquiryReducer;
