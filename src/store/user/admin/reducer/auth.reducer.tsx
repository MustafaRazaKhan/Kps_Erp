import { LoginAction, LoginState } from "../types/auth.type";

const AuthReducer = (state: LoginState, action: LoginAction): LoginState => {
  switch (action.type) {
    case "HANDLE_LOGIN_CHANGE":
      return {
        ...state,
        loginObj: {
          ...state.loginObj,
          [action.payload.name]: action.payload.value,
        },
      };
    default:
      return state;
  }
};

export default AuthReducer;
