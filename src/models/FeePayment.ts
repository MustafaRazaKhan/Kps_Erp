import mongoose, { Schema } from "mongoose";

const FeePaymentSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    classId: {
      type: Schema.Types.ObjectId,
      ref: "ClassModel",
    },
    className: {
      type: String,
    },
    classSection: {
      type: String,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    totalMonthFee: {
      type: Number,
    },
    totalBusFee: {
      type: Number,
    },
    totalYearFee: {
      type: Number,
    },
    remainingYearFee: {
      type: Number,
    },
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

    // ===================================================
    // PAYMENT AMOUNT
    // ===================================================

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
FeePaymentSchema.index({ transactionId: 1 }, { unique: true });

// A student can have many payments.
FeePaymentSchema.index({
  studentId: 1,
  createdAt: -1,
});

// Useful for admin pending-payment queries.
FeePaymentSchema.index({
  status: 1,
  createdAt: -1,
});

export const FeePayment =
  mongoose.models.FeePayment || mongoose.model("FeePayment", FeePaymentSchema);
