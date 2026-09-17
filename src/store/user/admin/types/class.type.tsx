export type ClassType = {
  _id?: string;
  name: string;
  section: string;
  no: number;
  isActive?: boolean;
};

export type ClassState = {
  classObj: ClassType;
  loading: boolean;
  classList: ClassType[];
};

export type ClassContextType = {
  state: ClassState;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  classList: () => Promise<void>;
  handleUpdate: (e: any, id: any) => Promise<void>;
  viewStudentListClassWise: (id: any) => Promise<void>;
};

export type ClassAction =
  | {
      type: "SET_LOADING";
    }
  | {
      type: "HANDLE_CHANGE";
      payload: {
        name: keyof ClassState["classObj"];
        value: string | number;
      };
    }
  | {
      type: "SET_CLASS_LIST";
      payload: ClassType[];
    }
  | {
      type: "SET_SUCCESS";
    };
