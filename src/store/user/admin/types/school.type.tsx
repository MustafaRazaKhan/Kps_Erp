import { ChangeEvent } from "react";
export type School = {
  _id?: string;
  name: string;
  code?: string;
  email: string;
  contact?: string;
  address?: string;
  image?: File | null; // backend may return buffer/string
  createdAt?: string;
  updatedAt?: string;
};

export type SchoolState = {
  schoolObj: {
    name: string;
    code: string;
    email: string;
    contact: string;
    address: string;
    image?: File | null;
  };
  schoolList: School[]; // ✅
  loading: boolean;
};

export type SchoolAction =
  | { type: "SET_LOADING" }
  | {
      type: "HANDLE_CHANGE";
      payload: { name: keyof SchoolState["schoolObj"]; value: any };
    }
  | { type: "HANDLE_FILE_CHANGE"; payload: { name: any; value: any } }
  | { type: "SET_SCHOOL"; payload: School[] };

export type SchoolContextType = {
  state: SchoolState;
  //   dispatch: React.Dispatch<SchoolAction>;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  handleFileChange: (e: any) => void;
  handleSubmit: (e: React.SyntheticEvent<HTMLFormElement>) => Promise<void>;
  schoolList: () => Promise<void>;
  handleDelete: (id: any) => Promise<void>;
};
