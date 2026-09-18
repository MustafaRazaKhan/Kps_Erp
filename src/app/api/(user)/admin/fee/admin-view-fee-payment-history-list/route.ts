import { FeePayment } from "@/models/FeePayment";
import { Student } from "@/models/Student";
import User from "@/models/User";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    const feePayments = await FeePayment.find()
      .populate({
        path: "userId",
        model: User,
      })
      .select("-password")

      .sort({ createdAt: -1 })
      .lean();
    console.log(feePayments);

    return NextResponse.json(
      {
        success: true,
        message: "Fee payments fetched successfully",
        data: feePayments,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get all fee payments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch fee payments",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
