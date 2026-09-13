import { ClassAction, ClassState } from "../types/class.type";

const classReducer = (state: ClassState, action: ClassAction): ClassState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "SET_SUCCESS":
      return { ...state, loading: false };
    case "HANDLE_CHANGE":
      return {
        ...state,
        classObj: {
          ...state.classObj,
          [action.payload.name]: action.payload.value,
        },
      };
    case "SET_CLASS_LIST":
      return {
        ...state,
        classList: action.payload,
      };
    case "VIEW_STUDENT_LIST_CLASS_WISE":
      return {
        ...state,
        // loading: false,
        studentListClassWise: action.payload,
      };

    default:
      return state;
  }
};

export default classReducer;
