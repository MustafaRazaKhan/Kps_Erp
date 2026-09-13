const studentReducer = (
  state: StudentState,
  action: StudentAction,
): StudentState => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: true };

    case "HANDLE_CHANGE":
      return {
        ...state,
        studentObj: {
          ...state.studentObj,
          [action.payload.name]: action.payload.value,
        },
      };

    // case "RESET_FORM":
    //   return {
    //     ...state,
    //     studentObj: initialFormData,
    //   };
    case "SET_STUDENTS":
      return {
        ...state,

        studentList: action.payload,
        studentFilterBackup: action.payload,
      };
    case "SET_SINGLE_STUDENT":
      return {
        ...state,
        studentDetail: action.payload,
      };
    case "FILTER_STUDENT":
      const search = action.payload?.toLowerCase()?.trim() || "";

      const filterData = state.studentFilterBackup.filter(
        (item) =>
          item.firstName?.toLowerCase().includes(search) ||
          item.lastName?.toLowerCase().includes(search),
        // item.srNo?.toLowerCase().includes(search)
      );
      // console.log(action.payload.data)

      return {
        ...state,
        studentList: filterData,
      };
    case "SET_STUDENTS_CLASS_WISE":
      return {
        ...state,
        studentListClassWise: action.payload.data,
      };

    default:
      return state;
  }
};

export default studentReducer;
