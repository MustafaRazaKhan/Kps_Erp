export type StudentType = {
  srNo: number | "";

  className: string;
  section: string;
  session: string;

  firstName: string;
  lastName: string;
  gender: string;

  dob: string;
  dobInWords: string;
  age: string;

  bloodGroup: string;
  religion: string;
  casteCategory: string;

  motherName: string;
  fatherName: string;

  motherNationality: string;
  fatherNationality: string;

  fatherOccupation: string;
  motherOccupation: string;

  motherMobileNumber: string;
  fatherMobileNumber: string;

  motherPermanentAddress: string;
  fatherPermanentAddress: string;

  officeAddress: string;

  annualIncome: number | "";

  localGurdianName: string;
  localGurdianAddress: string;

  lastSchoolName: string;
  lastSchoolAddress: string;

  isCbse: string;
  otherBoard: string;

  lastResult: string;
  percentage: string;

  subjectOffered: string[];

  motherTongue: string;
  homeTown: string;

  userId: string;
  classId: string;

  notes: string;

  photo: File | null;

  isActive: boolean;
};
export type StudentState = {
  studentDetail: StudentType;
  studentObj: {
    srNo: "";
    className: "";
    section: "";
    session: "";
    firstName: "";
    lastName: "";
    gender: "";
    dob: "";
    dobInWords: "";
    age: "";
    bloodGroup: "";
    religion: "";
    casteCategory: "";
    motherName: "";
    fatherName: "";
    motherNationality: "";
    fatherNationality: "";
    fatherOccupation: "";
    motherOccupation: "";
    motherMobileNumber: "";
    fatherMobileNumber: "";
    motherPermanentAddress: "";
    fatherPermanentAddress: "";
    officeAddress: "";
    annualIncome: "";
    localGurdianName: "";
    localGurdianAddress: "";
    lastSchoolName: "";
    lastSchoolAddress: "";
    isCbse: "";
    otherBoard: "";
    lastResult: "";
    percentage: "";
    subjectOffered: [];
    motherTongue: "";
    homeTown: "";
    userId: "";
    classId: "";
    notes: "";
    photo: null;
    feeGroup: "";
    isActive: true;
    busRoute: "";
  };
  isLoading: boolean;
  studentList: StudentType[];
  studentFilterBackup: StudentType[];
  studentListClassWise: StudentType[];
};
export type StudentAction =
  | { type: "SET_LOADING" }
  | { type: "SET_STUDENTS"; payload: any }
  | { type: "SET_SINGLE_STUDENT"; payload: any }
  | { type: "FILTER_STUDENT"; payload: any }
  | {
      type: "HANDLE_CHANGE";
      payload: { name: any; value: any };
    }
  | {
      type: "SET_STUDENTS_CLASS_WISE";
      payload: { data: any };
    };

export type StudentContextType = {
  state: StudentState;

  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    id: string,
  ) => Promise<void>;
  // getStudent: (id: string) => Promise<void>;
  // getStudentsClassWise: (id: any) => Promise<void>;
  studentList: () => Promise<void>;
  studentDetail: (id: any) => Promise<void>;
  // handleUpdate: (e: any) => Promise<void>;
  // filterStudents: (e: any) => void;
  // handleDelete: (id: any) => Promise<void>;
};
