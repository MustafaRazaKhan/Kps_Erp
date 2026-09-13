import { EnquiryState } from "../types/enquiry.types";

const initialState: EnquiryState = {
  loading: false,

  enquiryObj: {
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  },

  enquiryList: [],
  totalEnquiries: 0,
};
export default initialState;
