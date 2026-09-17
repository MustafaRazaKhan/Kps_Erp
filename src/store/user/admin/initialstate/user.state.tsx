import { UserState } from "../types/user.type";

const initialState: UserState = {
  loading: false,

  userObj: {
    name: "",
    email: "",
    password: "",
    role: "",
  },

  userList: [],

  //   totalDocs: 0,
  //   limit: 10,
  //   totalPages: 0,
  //   page: 1,
  //   counter: 0,
  //   hasPrevPage: false,
  //   hasNextPage: false,
  //   prevPage: 0,
  //   nextPage: 0,
};

export default initialState;
