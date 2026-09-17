import { SchoolAction, SchoolState } from "../types/school.type";

const schoolReducer = (
  state: SchoolState,
  action: SchoolAction,
): SchoolState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: true };
    case "HANDLE_CHANGE":
      return {
        ...state,
        schoolObj: {
          ...state.schoolObj,
          [action.payload.name]: action.payload.value, // update the correct field dynamically
        },
      };
    case "HANDLE_FILE_CHANGE":
      return {
        ...state,
        schoolObj: {
          ...state.schoolObj,
          [action.payload.name]: action.payload.value, // update the correct field dynamically
        },
      };
    case "SET_SCHOOL":
      return {
        ...state,
        schoolList: action.payload,
      };

    default:
      return state;
  }
};

export default schoolReducer;
