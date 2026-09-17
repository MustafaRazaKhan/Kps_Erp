// import { NextResponse } from "next/server";

// import connectDB from "@/utils/mongodb";
// import { Student } from "@/models/Student";
// import { StudentFeePayment } from "@/models/StudentFeePayment";

// export async function POST(req: Request) {
//   try {
//     await connectDB();

//     const body = await req.json();

//     const {
//       transactionId,
//       paymentDateTime,
//       feeType,
//       feeMonths,
//       paymentMode,
//       remarks,
//       userId,
//       amount,
//     } = body;

//     // =====================================================
//     // VALIDATION
//     // =====================================================

//     // -----------------------------------------------------
//     // USER ID
//     // -----------------------------------------------------

//     if (!userId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "User ID is required",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // TRANSACTION ID
//     // -----------------------------------------------------

//     const trimmedTransactionId =
//       typeof transactionId === "string" ? transactionId.trim() : "";

//     if (!trimmedTransactionId) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Transaction ID is required",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // PAYMENT DATE
//     // -----------------------------------------------------

//     if (!paymentDateTime) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Payment date and time is required",
//         },
//         { status: 400 },
//       );
//     }

//     const parsedPaymentDate = new Date(paymentDateTime);

//     if (Number.isNaN(parsedPaymentDate.getTime())) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid payment date and time",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // FEE TYPE
//     // -----------------------------------------------------

//     if (!feeType) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Fee type is required",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // FEE MONTHS
//     // -----------------------------------------------------

//     if (!Array.isArray(feeMonths) || feeMonths.length === 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Please select at least one fee month",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // PAYMENT MODE
//     // -----------------------------------------------------

//     if (!paymentMode) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Payment mode is required",
//         },
//         { status: 400 },
//       );
//     }

//     // -----------------------------------------------------
//     // AMOUNT
//     // -----------------------------------------------------

//     const paymentAmount = Number(amount);

//     if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Valid payment amount is required",
//         },
//         { status: 400 },
//       );
//     }

//     // =====================================================
//     // FIND STUDENT
//     // =====================================================

//     const student = await Student.findOne({
//       userId,
//     }).select("-photo");

//     if (!student) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Student not found",
//         },
//         { status: 404 },
//       );
//     }

//     // =====================================================
//     // TOTAL YEAR FEE
//     // =====================================================

//     const totalYearFee = Number(student.totalYearFee || 0);

//     if (!Number.isFinite(totalYearFee) || totalYearFee <= 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Student annual fee is not configured",
//         },
//         { status: 400 },
//       );
//     }

//     // =====================================================
//     // CHECK DUPLICATE TRANSACTION ID
//     // =====================================================
//     //
//     // IMPORTANT:
//     //
//     // We only check transactionId here.
//     //
//     // We DO NOT check studentId because the same student
//     // is allowed to make multiple instalments.
//     //
//     // Example:
//     //
//     // Student A + TXN001 -> allowed
//     // Student A + TXN002 -> allowed
//     // Student A + TXN003 -> allowed
//     //
//     // Student A + TXN001 -> duplicate
//     // Student B + TXN001 -> duplicate
//     //
//     // =====================================================

//     const existingPayment = await StudentFeePayment.findOne({
//       transactionId: trimmedTransactionId,
//     }).lean();

//     if (existingPayment) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "This transaction ID has already been submitted",
//         },
//         { status: 409 },
//       );
//     }

//     // =====================================================
//     // CALCULATE STUDENT'S EXISTING PAYMENTS
//     // =====================================================
//     //
//     // We calculate payments ONLY for this student.
//     //
//     // This prevents Student A's payments from affecting
//     // Student B.
//     //
//     // We include:
//     //
//     // approved + pending
//     //
//     // because a student should not be able to submit:
//     //
//     // Fee = ₹50,000
//     //
//     // Payment 1 = ₹30,000 pending
//     // Payment 2 = ₹30,000 pending
//     //
//     // That would create ₹60,000 of submitted payments.
//     //
//     // =====================================================

//     const paymentSummary = await StudentFeePayment.aggregate([
//       {
//         $match: {
//           studentId: student._id,

//           // Rejected payments are ignored.
//           status: {
//             $in: ["pending", "approved"],
//           },
//         },
//       },
//       {
//         $group: {
//           _id: null,

//           totalSubmitted: {
//             $sum: "$amount",
//           },

//           totalApproved: {
//             $sum: {
//               $cond: [
//                 {
//                   $eq: ["$status", "approved"],
//                 },
//                 "$amount",
//                 0,
//               ],
//             },
//           },

//           totalPending: {
//             $sum: {
//               $cond: [
//                 {
//                   $eq: ["$status", "pending"],
//                 },
//                 "$amount",
//                 0,
//               ],
//             },
//           },
//         },
//       },
//     ]);

//     const totalSubmitted = Number(paymentSummary[0]?.totalSubmitted || 0);

//     const totalApproved = Number(paymentSummary[0]?.totalApproved || 0);

//     const totalPending = Number(paymentSummary[0]?.totalPending || 0);

//     // =====================================================
//     // CURRENT BALANCE
//     // =====================================================

//     const currentRemainingFee = totalYearFee - totalSubmitted;

//     // =====================================================
//     // PREVENT NEGATIVE BALANCE
//     // =====================================================

//     if (currentRemainingFee <= 0) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Your full fee has already been submitted or paid.",
//         },
//         { status: 400 },
//       );
//     }

//     // =====================================================
//     // CHECK PAYMENT AMOUNT
//     // =====================================================

//     if (paymentAmount > currentRemainingFee) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: `Payment amount cannot be greater than remaining fee (${currentRemainingFee})`,
//         },
//         { status: 400 },
//       );
//     }

//     // =====================================================
//     // CALCULATE REMAINING FEE
//     // =====================================================
//     //
//     // This represents the remaining fee after considering
//     // this new payment.
//     //
//     // =====================================================

//     const remainingFee = currentRemainingFee - paymentAmount;

//     // =====================================================
//     // CREATE PAYMENT
//     // =====================================================

//     const payment = await StudentFeePayment.create({
//       studentId: student._id,

//       transactionId: trimmedTransactionId,

//       paymentDateTime: parsedPaymentDate,

//       feeType,

//       feeMonths,

//       paymentMode,

//       totalYearFee,

//       remarks: typeof remarks === "string" ? remarks.trim() : "",

//       amount: paymentAmount,

//       remainingFee,

//       // Admin will verify this payment
//       status: "pending",
//     });

//     // =====================================================
//     // SUCCESS
//     // =====================================================

//     return NextResponse.json(
//       {
//         success: true,

//         message:
//           "Fee payment submitted successfully. Waiting for admin verification.",

//         data: {
//           paymentId: payment._id,

//           transactionId: payment.transactionId,

//           studentId: payment.studentId,

//           amount: payment.amount,

//           status: payment.status,

//           totalYearFee,

//           totalApproved,

//           totalPending,

//           totalSubmitted: totalSubmitted + paymentAmount,

//           remainingFee,
//         },
//       },
//       { status: 201 },
//     );
//   } catch (error: any) {
//     console.error("STUDENT FEE PAYMENT ERROR:", error);

//     // =====================================================
//     // DUPLICATE TRANSACTION ID
//     // =====================================================
//     //
//     // This handles a race condition where two requests
//     // arrive at almost exactly the same time.
//     //
//     // The unique MongoDB index on transactionId is the
//     // actual protection.
//     //
//     // =====================================================

//     if (error?.code === 11000) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "This transaction ID has already been submitted",
//         },
//         { status: 409 },
//       );
//     }

//     // =====================================================
//     // GENERAL ERROR
//     // =====================================================

//     return NextResponse.json(
//       {
//         success: false,
//         message: error?.message || "Internal Server Error",
//       },
//       { status: 500 },
//     );
//   }
// }

import { NextResponse } from "next/server";

import connectDB from "@/utils/mongodb";
import { Student } from "@/models/Student";
import { StudentFeePayment } from "@/models/FeePayment";

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
      amount,
    } = body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          message: "User ID is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // TRANSACTION ID
    // =====================================================

    const trimmedTransactionId =
      typeof transactionId === "string" ? transactionId.trim() : "";

    if (!trimmedTransactionId) {
      return NextResponse.json(
        {
          success: false,
          message: "Transaction ID is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // PAYMENT DATE
    // =====================================================

    if (!paymentDateTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment date and time is required",
        },
        { status: 400 },
      );
    }

    const parsedPaymentDate = new Date(paymentDateTime);

    if (Number.isNaN(parsedPaymentDate.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid payment date and time",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // FEE TYPE
    // =====================================================

    if (!feeType) {
      return NextResponse.json(
        {
          success: false,
          message: "Fee type is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // FEE MONTHS
    // =====================================================

    if (!Array.isArray(feeMonths) || feeMonths.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select at least one fee month",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // PAYMENT MODE
    // =====================================================

    if (!paymentMode) {
      return NextResponse.json(
        {
          success: false,
          message: "Payment mode is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // AMOUNT
    // =====================================================

    const paymentAmount = Number(amount);

    if (!Number.isFinite(paymentAmount) || paymentAmount <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid payment amount is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // FIND STUDENT
    // =====================================================

    const student = await Student.findOne({
      userId,
    }).select("-photo");

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student not found",
        },
        { status: 404 },
      );
    }

    // =====================================================
    // GET CURRENT REMAINING FEE
    // =====================================================

    const remainingFee = Number(student.remainingFee || 0);

    // =====================================================
    // CHECK REMAINING FEE
    // =====================================================

    if (remainingFee <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Your full fee has already been paid.",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // CHECK PAYMENT AMOUNT
    // =====================================================

    if (paymentAmount > remainingFee) {
      return NextResponse.json(
        {
          success: false,
          message: `Payment amount cannot be greater than remaining fee (${remainingFee})`,
        },
        { status: 400 },
      );
    }

    // =====================================================
    // CHECK DUPLICATE TRANSACTION ID
    // =====================================================

    const existingPayment = await StudentFeePayment.findOne({
      transactionId: trimmedTransactionId,
    }).lean();

    if (existingPayment) {
      return NextResponse.json(
        {
          success: false,
          message: "This transaction ID has already been submitted",
        },
        { status: 409 },
      );
    }

    // =====================================================
    // CREATE PAYMENT
    // =====================================================
    //
    // IMPORTANT:
    //
    // We DO NOT update student.remainingFee here.
    //
    // The payment is only pending.
    //
    // Admin will update remainingFee after approval.
    //
    // =====================================================

    const payment = await StudentFeePayment.create({
      studentId: student._id,

      transactionId: trimmedTransactionId,

      paymentDateTime: parsedPaymentDate,

      feeType,

      feeMonths,

      paymentMode,

      totalYearFee: Number(student.totalYearFee),

      amount: paymentAmount,

      remarks: typeof remarks === "string" ? remarks.trim() : "",

      status: "pending",
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Fee payment submitted successfully. Waiting for admin verification.",

        data: {
          paymentId: payment._id,

          transactionId: payment.transactionId,

          amount: payment.amount,

          status: payment.status,

          remainingFee: student.remainingFee,
        },
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("STUDENT FEE PAYMENT ERROR:", error);

    // =====================================================
    // DUPLICATE KEY
    // =====================================================

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
