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
    console.log(body);

    const {
      transportId,
      vehicleType,
      registrationNumber,

      seatingCapacity,
      name,
      phone,
      licenseNumber,
      status,
    } = body;

    // ========================================
    // REQUIRED FIELD VALIDATION
    // ========================================

    if (!transportId?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Transport ID is required",
        },
        { status: 400 },
      );
    }

    if (!vehicleType) {
      return NextResponse.json(
        {
          success: false,
          message: "Vehicle type is required",
        },
        { status: 400 },
      );
    }

    if (!registrationNumber?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Registration number is required",
        },
        { status: 400 },
      );
    }

    if (seatingCapacity == null) {
      return NextResponse.json(
        {
          success: false,
          message: "Seating capacity is required",
        },
        { status: 400 },
      );
    }

    // ========================================
    // DRIVER VALIDATION
    // ========================================

    if (!name?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver name is required",
        },
        { status: 400 },
      );
    }

    if (!phone?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver phone is required",
        },
        { status: 400 },
      );
    }

    if (!licenseNumber?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver license number is required",
        },
        { status: 400 },
      );
    }

    // ========================================
    // CHECK DUPLICATE TRANSPORT
    // ========================================

    const existingTransport = await Transport.findOne({
      $or: [
        {
          transportId: transportId.trim(),
        },
        {
          registrationNumber: registrationNumber.trim(),
        },
      ],
    });

    if (existingTransport) {
      return NextResponse.json(
        {
          success: false,
          message: "Transport ID or registration number already exists",
        },
        { status: 409 },
      );
    }

    // ========================================
    // CREATE TRANSPORT
    // ========================================

    const transport = await Transport.create({
      transportId: transportId.trim(),

      vehicleType,

      registrationNumber: registrationNumber.trim(),

      seatingCapacity: Number(seatingCapacity),

      // Driver information
      name: name.trim(),

      phone: phone.trim(),

      licenseNumber: licenseNumber.trim(),

      status: status || "active",

      // New transport starts with empty maintenance history
      maintenanceHistory: [],
    });

    // ========================================
    // RESPONSE
    // ========================================

    return NextResponse.json(
      {
        success: true,
        message: "Transport created successfully",
        data: transport,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Create Transport Error:", error);

    // ========================================
    // MONGODB DUPLICATE KEY ERROR
    // ========================================

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "Transport ID or registration number already exists",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create transport",
      },
      { status: 500 },
    );
  }
}

// ========================================
// GET - Get All Transports
// ========================================
