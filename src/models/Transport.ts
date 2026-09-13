import mongoose from "mongoose";

const transportSchema = new mongoose.Schema(
  {
    // Vehicle
    transportNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    vehicleType: {
      type: String,
      enum: ["bus", "van", "car", "other"],
      default: "bus",
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
    },

    // Driver
    driver: {
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
    },

    // Maintenance
    maintenanceHistory: [
      {
        date: {
          type: Date,
          required: true,
        },

        description: {
          type: String,
          trim: true,
        },

        cost: {
          type: Number,
          default: 0,
        },
      },
    ],

    // Status
    status: {
      type: String,
      enum: ["active", "maintenance", "inactive"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

const Transport =
  mongoose.models.Transport || mongoose.model("Transport", transportSchema);

export default Transport;
