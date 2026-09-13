// models/StudentTransferCertificate.js

import mongoose from "mongoose";

const tCSchema = new mongoose.Schema(
  {
    // Student Details
    pupilName: {
      type: String,
      required: true,
      trim: true,
    },

    motherName: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      required: true,
      trim: true,
    },

    nationality: {
      type: String,
      default: "Indian",
    },

    category: {
      type: String,
      enum: ["SC", "ST", "OBC", "GENERAL", "OTHER"],
      required: true,
    },

    // DOB
    dateOfBirth: {
      type: Date,
      required: true,
    },

    dateOfBirthInWords: {
      type: String,
      required: true,
    },

    // Academic
    hasFailed: {
      type: Boolean,
      default: false,
    },

    firstAdmissionDate: {
      type: Date,
      required: true,
    },

    admissionClass: {
      type: String,
      required: true,
    },

    subjectsOffered: [
      {
        type: String,
      },
    ],

    lastStudiedClass: {
      type: String,
      required: true,
    },

    lastExam: {
      type: String,
    },

    lastExamResult: {
      type: String,
    },

    qualifiedForPromotion: {
      type: Boolean,
      default: false,
    },

    // Fees
    duesCleared: {
      type: Boolean,
      default: true,
    },

    feeConcession: {
      type: Boolean,
      default: false,
    },

    // Activity
    nccBoyScoutGirlGuide: {
      type: String,
      enum: ["NCC", "Boy Scout", "Girl Guide", "None"],
      default: "None",
    },

    // Leaving
    struckOffDate: {
      type: Date,
    },

    leavingReason: {
      type: String,
    },

    // Attendance
    totalMeetings: {
      type: Number,
      default: 0,
    },

    attendedSchoolDays: {
      type: Number,
      default: 0,
    },

    // Remarks
    generalConduct: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Poor"],
      default: "Good",
    },

    otherRemarks: {
      type: String,
    },

    certificateIssueDate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Tc || mongoose.model("Tc", tCSchema);
