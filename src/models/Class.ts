import mongoose from "mongoose";

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    section: {
      type: String,
    },
    no: {
      type: Number,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const ClassModel =
  mongoose.models.ClassModel || mongoose.model("ClassModel", classSchema);
export default ClassModel;
