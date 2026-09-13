import { TRANSPORT_ACTIONS } from "@/types/transport/transportType";
import { transportInitialState } from "@/initialState/transport/transportInitialState";

const transportReducer = (state, action) => {
  switch (action.type) {
    // =========================
    // GET ALL TRANSPORTS
    // =========================

    case TRANSPORT_ACTIONS.GET_TRANSPORTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case TRANSPORT_ACTIONS.GET_TRANSPORTS_SUCCESS:
      return {
        ...state,
        loading: false,
        transports: action.payload,
        error: null,
      };

    case TRANSPORT_ACTIONS.GET_TRANSPORTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =========================
    // CREATE TRANSPORT
    // =========================

    case TRANSPORT_ACTIONS.CREATE_TRANSPORT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        message: null,
      };

    case TRANSPORT_ACTIONS.CREATE_TRANSPORT_SUCCESS:
      return {
        ...state,
        loading: false,
        transports: [action.payload, ...state.transports],
        transport: action.payload,
        message: "Transport registered successfully",
        error: null,
      };

    case TRANSPORT_ACTIONS.CREATE_TRANSPORT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    // =========================
    // SET TRANSPORT
    // =========================

    case TRANSPORT_ACTIONS.SET_TRANSPORT:
      return {
        ...state,
        transport: action.payload,
        error: null,
      };

    // =========================
    // CLEAR TRANSPORT
    // =========================

    case TRANSPORT_ACTIONS.CLEAR_TRANSPORT:
      return {
        ...state,
        transport: {
          ...transportInitialState.transport,
          driver: {
            ...transportInitialState.transport.driver,
          },
          maintenanceHistory: [],
        },
      };

    // =========================
    // SET ERROR
    // =========================

    case TRANSPORT_ACTIONS.SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };

    // =========================
    // CLEAR ERROR
    // =========================

    case TRANSPORT_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null,
      };

    // =========================
    // CLEAR MESSAGE
    // =========================

    case TRANSPORT_ACTIONS.CLEAR_MESSAGE:
      return {
        ...state,
        message: null,
      };

    // =========================
    // DEFAULT
    // =========================

    default:
      return state;
  }
};

export default transportReducer;
