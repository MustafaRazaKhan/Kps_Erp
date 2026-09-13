import mongoose, { Schema, model, models } from "mongoose";

const TransportSchema = new Schema(
  {
    transportId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: ["bus", "van", "car", "other"],
      required: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicleModel: {
      type: String,
      default: "",
      trim: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
    },

    // ========================================
    // DRIVER INFORMATION
    // ========================================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    licenseNumber: {
      type: String,
      required: true,
      trim: true,
    },

    // ========================================
    // STATUS
    // ========================================

    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // ========================================
    // MAINTENANCE HISTORY
    // ========================================

    maintenanceHistory: [
      {
        date: {
          type: String,
          required: true,
        },

        description: {
          type: String,
          default: "",
        },

        cost: {
          type: Number,
          default: 0,
        },

        status: {
          type: String,
          default: "",
        },
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Transport = models.Transport || model("Transport", TransportSchema);

export default Transport;
