import {
  TransportStateType,
  TransportActionType,
} from "../types/transport.type";

const transportReducer = (
  state: TransportStateType,
  action: TransportActionType,
): TransportStateType => {
  switch (action.type) {
    case "HANDLE_TRANSPORT_CHANGE":
      return {
        ...state,

        transportObj: {
          ...state.transportObj,

          [action.payload.name]: action.payload.value,
        },
      };

    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };
    case "TRANSPORT_LIST":
      return {
        ...state,
        transportList: action.payload,
      };

    default:
      return state;
  }
};

export default transportReducer;
