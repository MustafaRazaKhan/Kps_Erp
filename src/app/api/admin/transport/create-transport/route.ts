import { NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Transport from "@/models/Transport";

// ========================================
// POST - Create New Transport
// ========================================
export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();

    const {
      transportNumber,
      vehicleType,
      registrationNumber,
      vehicleModel,
      manufacturer,
      manufacturingYear,
      seatingCapacity,
      driver,
      status,
      isActive,
    } = body;

    // ==============================
    // Required field validation
    // ==============================

    if (!transportNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Transport number is required",
        },
        { status: 400 },
      );
    }

    if (!registrationNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration number is required",
        },
        { status: 400 },
      );
    }

    if (!seatingCapacity) {
      return NextResponse.json(
        {
          success: false,
          message: "Seating capacity is required",
        },
        { status: 400 },
      );
    }

    // ==============================
    // Driver validation
    // ==============================

    if (!driver?.name) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver name is required",
        },
        { status: 400 },
      );
    }

    if (!driver?.phone) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver phone is required",
        },
        { status: 400 },
      );
    }

    if (!driver?.licenseNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver license number is required",
        },
        { status: 400 },
      );
    }

    // ==============================
    // Check duplicate transport
    // ==============================

    const existingTransport = await Transport.findOne({
      $or: [
        { transportNumber: transportNumber.trim() },
        { registrationNumber: registrationNumber.trim() },
      ],
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

    // ==============================
    // Create Transport
    // ==============================

    const transport = await Transport.create({
      transportNumber: transportNumber.trim(),
      vehicleType,
      registrationNumber: registrationNumber.trim(),
      vehicleModel,
      manufacturer,
      manufacturingYear,
      seatingCapacity,

      driver: {
        name: driver.name.trim(),
        phone: driver.phone.trim(),
        licenseNumber: driver.licenseNumber.trim(),
        licenseExpiryDate: driver.licenseExpiryDate || null,
        address: driver.address?.trim() || "",
        joiningDate: driver.joiningDate || null,
      },

      status: status || "active",
      isActive: isActive ?? true,

      // New transport starts with empty maintenance history
      maintenanceHistory: [],
    });
    console.log(Transport);

    return NextResponse.json(
      {
        success: true,
        message: "Transport created successfully",
        data: transport,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Create Transport Error:", error);

    // Handle MongoDB duplicate key error

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create transport",
        // error: error.message,
      },
      { status: 500 },
    );
  }
}

// ========================================
// GET - Get All Transports
// ========================================
export async function GET() {
  try {
    await connectDB();

    const transports = await Transport.find({}).sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        message: "Transports fetched successfully",
        count: transports.length,
        data: transports,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Transports Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transports",
        // error: error.message,
      },
      { status: 500 },
    );
  }
}
