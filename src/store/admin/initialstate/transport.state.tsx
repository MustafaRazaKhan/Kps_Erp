export const initialState = {
  transports: [],

  transport: {
    transportNumber: "",
    vehicleType: "bus",
    registrationNumber: "",
    vehicleModel: "",
    seatingCapacity: "",

    driver: {
      name: "",
      phone: "",
      licenseNumber: "",
    },

    maintenanceHistory: [],

    status: "active",
  },

  loading: false,
  error: null,
  message: null,
};

export default initialState;
