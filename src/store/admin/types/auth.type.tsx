export type LoginState = {
  isLoading: {
    loading: boolean;
    message: string;
  };
  loginObj: {
    role: string;
    email: string;
    password: string;
  };
  userObj: {
    userName: string;
    emaiL: string;
    photo: File | null;
  };
};

export type LoginContext = {
  state: LoginState;
  handleLoginChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleLoginSubmit: (
    e: React.SyntheticEvent<HTMLFormElement>,
  ) => Promise<void>;
};

export type LoginAction =
  | { type: "SET_LOADING"; payload: { loading: boolean; message: string } }
  | {
      type: "HANDLE_LOGIN_CHANGE";
      payload: { name: keyof LoginState["loginObj"]; value: any };
    }
  | {
      type: "HANDLE_LOGIN_SUBMIT";
    }
  | {
      type: "SET_SUCCESS";
      payload: { loading: boolean; message: string };
    };
