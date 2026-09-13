import { ClassState } from "../types/class.type";

const initialState: ClassState = {
  classObj: {
    name: "",
    section: "",
    no: 0,
  },
  classList: [],
  loading: false,
  studentListClassWise: [],
};

export default initialState;
