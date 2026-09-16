import mongoose from "mongoose";

/* =========================================================
   SCHEMA
========================================================= */

const StudentFeePaymentSchema = new mongoose.Schema(
  {
    /* ===================================================
       STUDENT
    =================================================== */

    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,
    },
    totalYearFee: {
      type: Number,
    },
    remainingFee: {
      type: Number,
    },

    /* ===================================================
       ACADEMIC INFORMATION
    =================================================== */

    session: {
      type: String,
      trim: true,
      default: "",
    },

    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClassModel",
      default: null,
    },
    className: {
      type: String,
    },

    classSection: {
      type: String,
      trim: true,
      default: "",
    },

    /* ===================================================
       TRANSACTION
    =================================================== */

    transactionId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },

    paymentDateTime: {
      type: Date,
      required: true,
    },

    /* ===================================================
       FEE INFORMATION
    =================================================== */

    feeType: {
      type: String,
      enum: ["tuition", "transport"],
      required: true,
    },

    feeMonths: {
      type: [String],
      required: true,

      validate: {
        validator: (value: any) => {
          return Array.isArray(value) && value.length > 0;
        },

        message: "At least one fee month is required",
      },
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    /* ===================================================
       PAYMENT MODE
    =================================================== */

    paymentMode: {
      type: String,
      enum: ["upi", "bank_transfer", "cash"],
      required: true,
    },

    /* ===================================================
       PAYMENT PROOF
    =================================================== */

    // paymentProof: {
    //   type: String,
    //   trim: true,
    //   default: "",
    // },

    /* ===================================================
       STUDENT REMARK
    =================================================== */

    remarks: {
      type: String,
      trim: true,
      default: "",
    },

    /* ===================================================
       VERIFICATION
    =================================================== */

    status: {
      type: String,

      enum: ["pending", "approved", "rejected", "cancelled"],

      default: "pending",

      index: true,
    },

    /* ===================================================
       ADMIN REMARK
    =================================================== */

    adminRemark: {
      type: String,
      trim: true,
      default: "",
    },

    /* ===================================================
       REJECTION
    =================================================== */

    rejectionReason: {
      type: String,
      trim: true,
      default: "",
    },

    /* ===================================================
       VERIFIED BY
    =================================================== */

    verifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    verifiedAt: {
      type: Date,
      default: null,
    },
  },

  {
    timestamps: true,
  },
);

/* =========================================================
   INDEXES
========================================================= */

StudentFeePaymentSchema.index({
  studentId: 1,
  createdAt: -1,
});

StudentFeePaymentSchema.index({
  studentId: 1,
  status: 1,
});

StudentFeePaymentSchema.index({
  session: 1,
  feeType: 1,
});

/* =========================================================
   MODEL
========================================================= */

export const StudentFeePayment =
  mongoose.models.StudentFeePayment ||
  mongoose.model("StudentFeePayment", StudentFeePaymentSchema);
