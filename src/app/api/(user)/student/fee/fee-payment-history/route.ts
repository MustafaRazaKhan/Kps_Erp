import { NextResponse } from "next/server";

import connectDB from "@/utils/mongodb";
import { StudentFeePayment } from "@/models/FeePayment";

export async function GET() {
  try {
    await connectDB();

    // =====================================================
    // GET ALL PAYMENTS
    // =====================================================

    const payments = await StudentFeePayment.find()
      .populate({
        path: "studentId",
        select: "name email userId totalYearFee remainingFee",
      })
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json(
      {
        success: true,

        count: payments.length,

        data: payments,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("ADMIN GET FEE PAYMENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
