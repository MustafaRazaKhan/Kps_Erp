export type FeeType = {
  _id?: string;
  feeObj: {
    admissionFee: string;
    annualFee: string;
    examinationFee: string;
    registrationFee: string;
    securityFee: string;
  };

  monthlyObj: {
    selectedClass?: string;
    monthFee: string;
    busFee: string;
  };
  monthList: [];
  feeList: [];
};

export type FeeState = {
  feeObj: FeeType["feeObj"];
  monthlyObj: FeeType["monthlyObj"];
  feeList: FeeType[];
  loading: boolean;
  monthList: FeeType["monthlyObj"][];
};

export type FeeAction =
  | {
      type: "HANDLE_CHANGE";
      payload: {
        name: any;
        value: string;
      };
    }
  | {
      type: "HANDLE_MONTHLY_FEE";
      payload: {
        name: any;
        value: string;
      };
    }
  | {
      type: "SET_LOADING";
    }
  | {
      type: "HANDLE_MONTHLY_SUBMIT";
      payload: any;
    }
  | {
      type: "SET_FEE_LIST";
      payload: any;
    };

export interface FeeContextType {
  state: FeeState;

  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;

  handleMonthlyFeeChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  handleSubmit: (
    e: React.SyntheticEvent<HTMLFormElement>,
    feeCategoryValue: any,
  ) => Promise<void>;
  handleMonthSubmit: (E: any, selectedClass: any) => void;

  feeList: () => Promise<void>;
}
