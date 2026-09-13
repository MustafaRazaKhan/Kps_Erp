import { ReactNode } from "react";

// ========================================
// DRIVER TYPE
// ========================================

export interface Driver {
  name: string;
  phone: string;
  licenseNumber: string;
}

// ========================================
// MAINTENANCE TYPE
// ========================================

export interface Maintenance {
  _id?: string;
  date: string;
  description?: string;
  cost: number;
}

// ========================================
// TRANSPORT TYPE
// ========================================

export interface Transport {
  _id?: string;

  transportNumber: string;

  vehicleType: "bus" | "van" | "car" | "other";

  registrationNumber: string;

  vehicleModel?: string;

  seatingCapacity: number;

  driver: Driver;

  maintenanceHistory: Maintenance[];

  status: "active" | "maintenance" | "inactive";

  createdAt?: string;
  updatedAt?: string;
}

// ========================================
// TRANSPORT STATE TYPE
// ========================================

export interface TransportState {
  transports: Transport[];

  transport: Transport | null;

  loading: boolean;

  error: string | null;

  message: string | null;
}

// ========================================
// CREATE TRANSPORT ACTION
// ========================================

export interface CreateTransportRequestAction {
  type: "CREATE_TRANSPORT_REQUEST";
}

export interface CreateTransportSuccessAction {
  type: "CREATE_TRANSPORT_SUCCESS";
  payload: Transport;
}

export interface CreateTransportFailureAction {
  type: "CREATE_TRANSPORT_FAILURE";
  payload: string;
}

// ========================================
// GET TRANSPORTS ACTION
// ========================================

export interface GetTransportsRequestAction {
  type: "GET_TRANSPORTS_REQUEST";
}

export interface GetTransportsSuccessAction {
  type: "GET_TRANSPORTS_SUCCESS";
  payload: Transport[];
}

export interface GetTransportsFailureAction {
  type: "GET_TRANSPORTS_FAILURE";
  payload: string;
}

// ========================================
// SET TRANSPORT ACTION
// ========================================

export interface SetTransportAction {
  type: "SET_TRANSPORT";
  payload: Transport;
}

// ========================================
// CLEAR TRANSPORT ACTION
// ========================================

export interface ClearTransportAction {
  type: "CLEAR_TRANSPORT";
}

// ========================================
// ERROR ACTION
// ========================================

export interface SetErrorAction {
  type: "SET_ERROR";
  payload: string;
}

export interface ClearErrorAction {
  type: "CLEAR_ERROR";
}

// ========================================
// MESSAGE ACTION
// ========================================

export interface ClearMessageAction {
  type: "CLEAR_MESSAGE";
}

// ========================================
// TRANSPORT ACTION TYPE
// ========================================

export type TransportAction =
  | CreateTransportRequestAction
  | CreateTransportSuccessAction
  | CreateTransportFailureAction
  | GetTransportsRequestAction
  | GetTransportsSuccessAction
  | GetTransportsFailureAction
  | SetTransportAction
  | ClearTransportAction
  | SetErrorAction
  | ClearErrorAction
  | ClearMessageAction;

// ========================================
// API RESPONSE TYPES
// ========================================

export interface GetTransportsResponse {
  success: boolean;
  message: string;
  count: number;
  data: Transport[];
}

export interface CreateTransportResponse {
  success: boolean;
  message: string;
  data: Transport;
}

// ========================================
// CREATE TRANSPORT DATA TYPE
// ========================================

export interface CreateTransportData {
  transportNumber: string;

  vehicleType: "bus" | "van" | "car" | "other";

  registrationNumber: string;

  vehicleModel?: string;

  seatingCapacity: number;

  driver: Driver;

  status?: "active" | "maintenance" | "inactive";
}

// ========================================
// TRANSPORT CONTEXT TYPE
// ========================================

export interface TransportContextType {
  state: TransportState;

  getTransports: () => Promise<GetTransportsResponse>;

  createTransport: (
    transportData: CreateTransportData,
  ) => Promise<CreateTransportResponse>;

  setTransport: (transport: Transport) => void;

  clearTransport: () => void;

  clearError: () => void;

  clearMessage: () => void;
}
