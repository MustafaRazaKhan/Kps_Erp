import { SchoolState } from "../types/school.type";

const initialState: SchoolState = {
  schoolObj: {
    name: "",
    code: "",
    email: "",
    contact: "",
    address: "",
    image: null, // ✅ FIX
  },
  schoolList: [], // 👈 add this
  loading: false,
};

export default initialState;
