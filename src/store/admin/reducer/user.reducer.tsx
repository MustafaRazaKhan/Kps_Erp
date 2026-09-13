import { UserAction, UserState } from "../types/user.type";

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SET_USERS":
      return {
        ...state,

        userList: action.payload.userList,
        // totalDocs: action.payload.totalDocs,
        // limit: action.payload.limit,
        // totalPages: action.payload.totalPages,
        // page: action.payload.page,
        // counter: action.payload.counter,
        // hasPrevPage: action.payload.hasPrevPage,
        // hasNextPage: action.payload.hasNextPage,
        // prevPage: action.payload.prevPage,
        // nextPage: action.payload.nextPage,
      };

    case "HANDLE_CHANGE":
      return {
        ...state,
        userObj: {
          ...state.userObj,
          [action.payload.name]: action.payload.value,
        },
      };

    case "SET_LOADING":
    // case "SET_SUCCESS":
    //   return {
    //     ...state,
    //     isLoading: action.payload,
    //   };

    default:
      return state;
  }
};

export default userReducer;
