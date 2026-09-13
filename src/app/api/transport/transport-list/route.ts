import Transport from "@/models/Transport";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const transports = await Transport.find().sort({ createdAt: -1 }).lean();

    return NextResponse.json(
      {
        success: true,
        count: transports.length,
        transports,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Get All Transports Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch transports",
        error: error.message,
      },
      { status: 500 },
    );
  }
}
