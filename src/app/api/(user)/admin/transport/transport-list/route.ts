import Transport from "@/models/Transport";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

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
      },
      { status: 500 },
    );
  }
}
