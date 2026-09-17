import mongoose, { Schema, Document } from "mongoose";

export interface IStudentFeePayment extends Document {
  studentId: mongoose.Types.ObjectId;

  transactionId: string;

  paymentDateTime: Date;

  feeType: string;

  feeMonths: string[];

  paymentMode: string;

  totalYearFee: number;

  amount: number;

  remarks: string;

  status: "pending" | "approved" | "rejected";

  approvedAt?: Date;

  rejectedAt?: Date;

  adminRemarks?: string;
}

const StudentFeePaymentSchema = new Schema<IStudentFeePayment>(
  {
    // ===================================================
    // STUDENT
    // ===================================================

    studentId: {
      type: Schema.Types.ObjectId,
      ref: "Student",
      required: true,
      index: true,

      // IMPORTANT:
      // DO NOT use unique: true here.
      //
      // A student can have multiple payments.
    },

    // ===================================================
    // TRANSACTION ID
    // ===================================================

    transactionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },

    // ===================================================
    // PAYMENT DATE
    // ===================================================

    paymentDateTime: {
      type: Date,
      required: true,
    },

    // ===================================================
    // FEE TYPE
    // ===================================================

    feeType: {
      type: String,
      required: true,
      trim: true,
    },

    // ===================================================
    // FEE MONTHS
    // ===================================================

    feeMonths: {
      type: [String],
      required: true,
      default: [],
    },

    // ===================================================
    // PAYMENT MODE
    // ===================================================

    paymentMode: {
      type: String,
      required: true,
      trim: true,
    },

    // ===================================================
    // TOTAL YEAR FEE
    // ===================================================

    totalYearFee: {
      type: Number,
      required: true,
      min: 0,
    },

    // ===================================================
    // PAYMENT AMOUNT
    // ===================================================

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    // ===================================================
    // REMARKS
    // ===================================================

    remarks: {
      type: String,
      default: "",
      trim: true,
    },

    // ===================================================
    // PAYMENT STATUS
    // ===================================================

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
      index: true,
    },

    // ===================================================
    // ADMIN APPROVAL INFORMATION
    // ===================================================

    approvedAt: {
      type: Date,
    },

    rejectedAt: {
      type: Date,
    },

    adminRemarks: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

// =======================================================
// IMPORTANT INDEXES
// =======================================================

// One transaction ID can exist only once globally.
StudentFeePaymentSchema.index({ transactionId: 1 }, { unique: true });

// A student can have many payments.
StudentFeePaymentSchema.index({
  studentId: 1,
  createdAt: -1,
});

// Useful for admin pending-payment queries.
StudentFeePaymentSchema.index({
  status: 1,
  createdAt: -1,
});

export const StudentFeePayment =
  mongoose.models.StudentFeePayment ||
  mongoose.model<IStudentFeePayment>(
    "StudentFeePayment",
    StudentFeePaymentSchema,
  );
