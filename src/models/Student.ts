import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    srNo: {
      type: Number,
    },
    className: {
      type: String,
    },

    section: {
      type: String,
    },
    session: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    gender: {
      type: String,
    },
    dob: {
      type: Date,
    },
    dobInWords: {
      type: String,
    },
    age: {
      type: String,
    },
    bloodGroup: {
      type: String,
    },
    religion: {
      type: String,
    },
    casteCategory: {
      type: String,
    },
    motherName: {
      type: String,
    },
    fatherName: {
      type: String,
    },
    motherNationality: {
      type: String,
    },
    fatherNationality: {
      type: String,
    },
    fatherOccupation: {
      type: String,
    },
    motherOccupation: {
      type: String,
    },
    motherMobileNumber: {
      type: String,
    },
    fatherMobileNumber: {
      type: String,
    },
    motherPermanentAddress: String,
    fatherPermanentAddress: String,
    officeAddress: String,
    annualIncome: Number,
    localGurdianName: String,
    localGurdianAddress: String,
    lastSchoolName: String,
    lastSchoolAddress: String,
    isCbse: String,
    otherBoard: String,
    lastResult: String,
    percentage: String,
    subjectOffered: [],
    motherTongue: String,
    homeTown: String,
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassModel",
    },

    totalMonthFee: {
      type: Number,
    },
    totalBusFee: {
      type: Number,
    },
    totalFee: {
      type: Number,
    },

    notes: String,

    // ✅ SaaS way (use URL, not buffer)
    photo: {
      data: { type: Buffer, required: true },
      imageType: { type: String, required: true },
      name: { type: String },
    },

    isActive: {
      type: Boolean,
      default: true,
      // index: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Student =
  mongoose.models.Student || mongoose.model("Student", studentSchema);
