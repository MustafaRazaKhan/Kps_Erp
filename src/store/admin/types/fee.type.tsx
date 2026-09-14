import React from "react";

export type FeeMonthlyItem = {
  selectedClass?: string;
  monthFee: string | number;
  busFee: string | number;
};

export type FeeType = {
  _id?: string;

  admissionFee: string | number;
  annualFee: string | number;
  examinationFee: string | number;
  registrationFee: string | number;
  securityFee: string | number;

  feeCategoryValue?: string;
  feeGroup?: string;

  monthFeeList: FeeMonthlyItem[];
};

export type FeeState = {
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

  feeList: FeeType[];

  monthList: FeeMonthlyItem[];

  // Single fee structure selected by MongoDB _id
  feeDetails: FeeType | null;

  loading: boolean;
};

export type FeeAction =
  | {
      type: "HANDLE_CHANGE";
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: "HANDLE_MONTHLY_FEE";
      payload: {
        name: string;
        value: string;
      };
    }
  | {
      type: "SET_LOADING";
    }
  | {
      type: "HANDLE_MONTHLY_SUBMIT";
      payload: FeeMonthlyItem;
    }
  | {
      type: "SET_FEE_LIST";
      payload: FeeType[];
    }
  | {
      type: "SET_FEE_DETAILS";
      payload: FeeType;
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

  handleMonthSubmit: (e: React.SyntheticEvent, selectedClass: string) => void;

  feeList: () => Promise<void>;

  // Get one fee structure by MongoDB _id
  feeDetails: (id: string) => Promise<FeeType | undefined>;
}
