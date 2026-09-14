import mongoose from "mongoose";
const feeSchema = new mongoose.Schema(
  {
    feeGroup: {
      type: String,
      enum: ["PNC-KG", "I-V", "VI-VIII", "IX-XII"],
      required: true,
      unique: true,
    },

    admissionFee: {
      type: Number,
      default: 0,
    },

    annualFee: {
      type: Number,
      default: 0,
    },

    examinationFee: {
      type: Number,
      default: 0,
    },

    monthFeeList: [],
    registrationFee: {
      type: Number,
      default: 0,
    },
    securityFee: {
      type: Number,
      default: 0,
    },

    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Fee || mongoose.model("Fee", feeSchema);
