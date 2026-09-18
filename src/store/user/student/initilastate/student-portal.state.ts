import { StudentPortalState } from "../types/student-portal.type";

const initialState: StudentPortalState = {
  loading: false,

  feePayment: {
    transactionId: "",
    paymentDateTime: "",
    feeType: "",
    feeMonths: [],
    paymentMode: "",
    remarks: "",
    amount: null,
  },
  studentProfile: {
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

  feePaymentList: [],

  error: null,
  success: null,
};

export default initialState;
