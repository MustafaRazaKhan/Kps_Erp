import { NextResponse } from "next/server";
import mongoose from "mongoose";

import connectDB from "@/utils/mongodb";
import { Student } from "@/models/Student";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      transactionId,
      paymentDateTime,
      feeType,
      feeMonths,
      paymentMode,
      remarks,
      userId,
    } = body;

    /* =====================================================
       VALIDATION
    ===================================================== */

    // if (!mongoose.Types.ObjectId.isValid(studentId)) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Invalid Student ID",
    //     },
    //     { status: 400 },
    //   );
    // }

    if (!transactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID is required",
        },
        { status: 400 },
      );
    }

    if (!paymentDateTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment date and time is required",
        },
        { status: 400 },
      );
    }

    if (!feeType) {
      return NextResponse.json(
        {
          success: false,
          message: "Fee type is required",
        },
        { status: 400 },
      );
    }

    if (!Array.isArray(feeMonths) || feeMonths.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select at least one fee month",
        },
        { status: 400 },
      );
    }

    if (!paymentMode) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment mode is required",
        },
        { status: 400 },
      );
    }

    /* =====================================================
       FIND STUDENT
    ===================================================== */

    // const student = await Student.findById(studentId);

    // if (!student) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Student not found",
    //     },
    //     { status: 404 },
    //   );
    // }

    /* =====================================================
       CHECK DUPLICATE TRANSACTION
    ===================================================== */

    // const existingPayment = await StudentFeePayment.findOne({
    //   transactionId: transactionId.trim(),
    // });

    // if (existingPayment) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "This transaction ID has already been submitted",
    //     },
    //     { status: 409 },
    //   );
    // }

    // /* =====================================================
    //    CREATE PAYMENT
    // ===================================================== */

    // const payment = await StudentFeePayment.create({
    //   studentId: student._id,

    //   transactionId: transactionId.trim(),

    //   paymentDateTime: new Date(paymentDateTime),

    //   feeType,

    //   feeMonths,

    //   paymentMode,

    //   remarks: remarks?.trim() || "",

    //   // Admin will verify this payment
    //   status: "pending",
    // });

    /* =====================================================
       SUCCESS
    ===================================================== */

    return NextResponse.json(
      {
        success: true,
        message:
          "Fee payment submitted successfully. Waiting for admin verification.",
        // data: payment,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("STUDENT FEE PAYMENT ERROR:", error);

    /* =====================================================
       DUPLICATE KEY ERROR
    ===================================================== */

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "This transaction ID has already been submitted",
        },
        { status: 409 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
