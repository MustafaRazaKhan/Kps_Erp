export type EnquiryObj = {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  comment?: string;

  message: string;
  status?: string;
  
};

export type EnquiryState = {
  loading: boolean;
  enquiryObj: EnquiryObj;
  enquiryList: EnquiryObj[];
  totalEnquiries?: number;
};

export type EnquiryContextType = {
  state: EnquiryState;
  setComment: any;
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => void;

  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  handleUpdate: (e: any, id: any) => Promise<void>;
  handleDelete: (id: any) => Promise<void>;

  //   getEnquiryList: () => Promise<void>;
  //   handleUpdate: (e: any, id: any) => Promise<void>;
  //   handleDelete: (id: any) => Promise<void>;
};

export type EnquiryAction =
  | {
      type: "SET_LOADING";
    }
  | {
      type: "HANDLE_CHANGE";
      payload: {
        name: keyof EnquiryState["enquiryObj"]; // ✅ strongly typed
        value: string | number;
      };
    }
  | {
      type: "SET_SUCCESS";
    }
  | {
      type: "ENQUIRY_RESET";
    }
  | {
      type: "SET_ENQUIRIES";
      payload: { data: EnquiryObj[]; totalEnquiries: number };
    };
