import { NextResponse } from "next/server";
import Transport from "@/models/Transport";
import connectDB from "@/utils/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      transportNumber,
      vehicleType,
      registrationNumber,
      vehicleModel,
      manufacturer,
      manufacturingYear,
      seatingCapacity,
      driver,
    } = body;

    // Required fields
    if (
      !transportNumber ||
      !registrationNumber ||
      !seatingCapacity ||
      !driver?.name ||
      !driver?.phone ||
      !driver?.licenseNumber
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide all required transport and driver details",
        },
        { status: 400 },
      );
    }

    // Check duplicate transport number or registration number
    const existingTransport = await Transport.findOne({
      $or: [{ transportNumber }, { registrationNumber }],
    });

    if (existingTransport) {
      return NextResponse.json(
        {
          success: false,
          message: "Transport number or registration number already exists",
        },
        { status: 409 },
      );
    }

    // Create transport
    const transport = await Transport.create({
      transportNumber,
      vehicleType: vehicleType || "bus",
      registrationNumber,
      vehicleModel,
      manufacturer,
      manufacturingYear,
      seatingCapacity,
      driver,

      // New vehicle has no maintenance records
      maintenanceHistory: [],

      status: "active",
      isActive: true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Transport registered successfully",
        transport,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create Transport Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to register transport",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
