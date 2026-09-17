// ================= TYPES =================

export type UserType = {
  _id?: string;
  name: string;
  password?: string;
  email: string;
  role: string;
};

export type UserState = {
  loading: boolean;

  userObj: UserType;

  userList: UserType[];
  //   totalDocs: number;
  //   limit: number;
  //   totalPages: number;
  //   page: number;
  //   counter: number;
  //   hasPrevPage: boolean;
  //   hasNextPage: boolean;
  //   prevPage: number;
  //   nextPage: number;

  //  data: data.docs,

  // totalDocs: data.totalDocs,
  // limit: data.limit,
  // totalPages: data.totalPages,
  // page: data.page,
  // counter:data.pagingCounter,
  // hasPrevPage: data.hasPrevPage,
  // hasNextPage: data.hasNextPage,
  // prevPage: data.prevPage,
  // nextPage: data.nextPage
};

export type UserAction =
  | {
      type: "SET_LOADING";
      payload: { loading: boolean; message: string };
    }
  //   | {
  //       type: "SET_SUCCESS";
  //       payload: { loading: boolean; message: string };
  //     }
  | {
      type: "HANDLE_CHANGE";
      payload: {
        name: keyof UserState["userObj"];
        value: string;
      };
    }
  | {
      type: "SET_USERS";
      payload: {
        userList: UserType[];
        // totalDocs: number;
        // limit: number;
        // totalPages: number;
        // page: number;
        // counter: number;
        // hasPrevPage: boolean;
        // hasNextPage: boolean;
        // prevPage: number;
        // nextPage: number;
      };
    };

export type UserContextType = {
  state: UserState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  userList: (page?: number) => Promise<void>;
  handleUpdate: (id: any, status: any) => Promise<void>;
};
