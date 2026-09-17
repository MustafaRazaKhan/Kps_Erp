import { StudentState } from "../types/student.type";

const initialState: StudentState = {
  isLoading: false,
  studentObj: {
    srNo: "",
    className: "",
    section: "",
    session: "",

    firstName: "",
    lastName: "",
    gender: "",

    dob: "",
    dobInWords: "",
    age: "",

    bloodGroup: "",
    religion: "",
    casteCategory: "",

    motherName: "",
    fatherName: "",

    motherNationality: "",
    fatherNationality: "",

    fatherOccupation: "",
    motherOccupation: "",

    motherMobileNumber: "",
    fatherMobileNumber: "",

    motherPermanentAddress: "",
    fatherPermanentAddress: "",

    officeAddress: "",

    annualIncome: "",

    localGurdianName: "",
    localGurdianAddress: "",

    lastSchoolName: "",
    lastSchoolAddress: "",

    isCbse: "",
    otherBoard: "",

    lastResult: "",
    percentage: "",

    subjectOffered: [],

    motherTongue: "",
    homeTown: "",

    userId: "",
    classId: "",

    notes: "",

    photo: null,

    isActive: true,
    feeGroup: "",
    busRoute: "",
  },
  studentList: [],
  studentFilterBackup: [],
  studentDetail: {
    srNo: "",

    className: "",
    section: "",
    session: "",

    firstName: "",
    lastName: "",
    gender: "",

    dob: "",
    dobInWords: "",
    age: "",

    bloodGroup: "",
    religion: "",
    casteCategory: "",

    motherName: "",
    fatherName: "",

    motherNationality: "",
    fatherNationality: "",

    fatherOccupation: "",
    motherOccupation: "",

    motherMobileNumber: "",
    fatherMobileNumber: "",

    motherPermanentAddress: "",
    fatherPermanentAddress: "",

    officeAddress: "",

    annualIncome: "",

    localGurdianName: "",
    localGurdianAddress: "",

    lastSchoolName: "",
    lastSchoolAddress: "",

    isCbse: "",
    otherBoard: "",

    lastResult: "",
    percentage: "",

    subjectOffered: [],

    motherTongue: "",
    homeTown: "",

    userId: "",
    classId: "",

    notes: "",

    photo: null,

    isActive: true,
  },
  studentListClassWise: [],
};

export default initialState;
