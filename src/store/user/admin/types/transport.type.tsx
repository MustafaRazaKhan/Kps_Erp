// ========================================
// TRANSPORT TYPE
// ========================================

export type TransportType = {
  _id?: string;

  transportId: string;

  vehicleType: "" | "bus" | "van" | "car" | "other";

  registrationNumber: string;

  vehicleModel?: string;

  seatingCapacity: number | null;

  // Driver information
  name: string;

  phone: string;

  licenseNumber: string;
};

// ========================================
// DRIVER TYPE
// ========================================

export interface DriverType {}

// ========================================
// MAINTENANCE TYPE
// ========================================

export interface MaintenanceType {
  _id?: string;

  date: string;

  description?: string;

  cost: number;

  status?: string;
}

// ========================================
// TRANSPORT STATE TYPE
// ========================================

export interface TransportStateType {
  transportObj: TransportType;

  maintenanceHistory: MaintenanceType[];

  loading: boolean;
  transportList: TransportType[];

  status: "active" | "inactive";
}

// ========================================
// TRANSPORT CONTEXT TYPE
// ========================================

export type TransportContextType = {
  state: TransportStateType;

  handleTransportChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleTransportSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;

  transportList: () => Promise<void>;
};

// ========================================
// TRANSPORT ACTION TYPE
// ========================================

export type TransportActionType =
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_SUCCESS";
    }
  | {
      type: "HANDLE_TRANSPORT_CHANGE";
      payload: {
        name: keyof TransportType;
        value: string | number | null;
      };
    }
  | {
      type: "TRANSPORT_LIST";
      payload: any;
    };
