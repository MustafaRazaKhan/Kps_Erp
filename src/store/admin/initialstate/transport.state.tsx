import { TransportStateType } from "../types/transport.type";

export const initialState: TransportStateType = {
  transportObj: {
    transportId: "",

    vehicleType: "",

    registrationNumber: "",

    seatingCapacity: null,

    name: "",

    phone: "",

    licenseNumber: "",
  },

  maintenanceHistory: [],

  loading: false,

  status: "active",
  transportList: [],
};

export default initialState;
