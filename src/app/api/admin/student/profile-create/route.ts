// import "@/models/Class";

import { NextResponse } from "next/server";
import mongoose from "mongoose";
// import ClassModel from "@/models/Class";
import connectDB from "@/utils/mongodb";
import { Student } from "@/models/Student";
import Fee from "@/models/Fee";
import { ImInsertTemplate } from "react-icons/im";
import ClassModel from "@/models/Class";

/* ================= POST ================= */

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();

    const photoFile = formData.get("photo") as File | null;

    if (!photoFile) {
      return NextResponse.json(
        {
          success: false,
          message: "Photo is required",
        },
        { status: 400 },
      );
    }

    /* ================= VALIDATE USER ID ================= */

    const userId = formData.get("userId") as string;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid User ID",
        },
        { status: 400 },
      );
    }
    const exsistUserId = await Student.findOne({ userId: userId });
    if (exsistUserId) {
      return NextResponse.json({
        success: false,
        message: "Profile is Already Created",
      });
    }

    /* ================= IMAGE ================= */

    const photoBuffer = Buffer.from(await photoFile.arrayBuffer());

    // const optimized = await resizeImage(photoBuffer);

    /* ================= STUDENT DATA ================= */

    const studentData = {
      srNo: formData.get("srNo"),

      session: formData.get("session"),

      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),

      gender: formData.get("gender"),

      dob: formData.get("dob"),
      dobInWords: formData.get("dobInWords"),
      age: formData.get("age"),

      bloodGroup: formData.get("bloodGroup"),
      religion: formData.get("religion"),
      casteCategory: formData.get("casteCategory"),

      motherName: formData.get("motherName"),
      fatherName: formData.get("fatherName"),

      motherNationality: formData.get("motherNationality"),
      fatherNationality: formData.get("fatherNationality"),

      fatherOccupation: formData.get("fatherOccupation"),
      motherOccupation: formData.get("motherOccupation"),

      motherMobileNumber: formData.get("motherMobileNumber"),

      fatherMobileNumber: formData.get("fatherMobileNumber"),

      motherPermanentAddress: formData.get("motherPermanentAddress"),

      fatherPermanentAddress: formData.get("fatherPermanentAddress"),

      officeAddress: formData.get("officeAddress"),

      annualIncome: formData.get("annualIncome"),

      localGurdianName: formData.get("localGurdianName"),

      localGurdianAddress: formData.get("localGurdianAddress"),

      lastSchoolName: formData.get("lastSchoolName"),

      lastSchoolAddress: formData.get("lastSchoolAddress"),

      isCbse: formData.get("isCbse"),

      otherBoard: formData.get("otherBoard"),

      lastResult: formData.get("lastResult"),

      percentage: formData.get("percentage"),

      motherTongue: formData.get("motherTongue"),

      homeTown: formData.get("homeTown"),

      classId: formData.get("classId"),

      userId,

      notes: formData.get("notes"),
      feeGroup: formData.get("feeGroup"),
      busRoute: formData.get("busRoute"),

      isActive: true,

      /* ================= PHOTO ================= */

      photo: {
        data: photoBuffer,
        imageType: (photoFile as any).type,
        name: photoFile.name,
      },
    };
    const classData = await ClassModel.findOne({
      _id: studentData.classId,
    });

    // console.log("Class Data:", classData);

    let totalMonthFee = 0;
    let totalBusFee = 0;
    let totalFee = 0;

    if (studentData.feeGroup && classData) {
      // Find the fee structure for the student's fee group
      const feeCategoryGroup = await Fee.findOne({
        feeCategoryValue: studentData.feeGroup,
      });

      if (!feeCategoryGroup) {
        throw new Error("Fee structure not found for this fee group.");
      }

      // Find fee for the student's class
      const classFee = feeCategoryGroup.monthList.find(
        (item: any) => item.selectedClass === classData.name,
      );

      console.log(classFee, "classFee");
      if (!classFee) {
        throw new Error(`Fee structure not found for ${classData.name}.`);
      }

      // ==============================
      // Monthly Fee - 12 Months
      // ==============================

      const monthlyFee = Number(classFee.monthFee || 0);

      totalMonthFee = monthlyFee * 12;
      console.log(totalMonthFee, "totalMonthFee");

      // ==============================
      // Bus Fee - 12 Months
      // ==============================

      // if (studentData.busRoute) {
      //   const busFee = Number(classFee.busFee || 0);

      //   totalBusFee = busFee * 12;
      // }

      // ==============================
      // One-Time Fees
      // ==============================

      const admissionFee = Number(feeCategoryGroup.admissionFee || 0);

      const annualFee = Number(feeCategoryGroup.annualFee || 0);

      const examinationFee = Number(feeCategoryGroup.examinationFee || 0);

      const registrationFee = Number(feeCategoryGroup.registrationFee || 0);

      const securityFee = Number(feeCategoryGroup.securityFee || 0);

      // console.log("========== FEE CALCULATION ==========");

      // console.log("Monthly:", totalMonthFee);
      // console.log("Bus:", totalBusFee);
      // console.log("Admission:", admissionFee);
      // console.log("Annual:", annualFee);
      // console.log("Examination:", examinationFee);
      // console.log("Registration:", registrationFee);
      // console.log("Security:", securityFee);
      // // console.log("TOTAL:", totalFee);

      // console.log("=====================================");
      // ==============================
      // Total Fee
      // ==============================

      totalFee =
        totalMonthFee +
        // totalBusFee +
        admissionFee +
        annualFee +
        examinationFee +
        registrationFee +
        securityFee;
    }

    // console.log(totalMonthFee, "outside");
    // console.log(totalFee, "outside");
    console.log("Saving Student...");
    console.log({
      totalMonthFee,
      totalBusFee,
      totalFee,
      feeGroup: studentData.feeGroup,
      classId: studentData.classId,
    });

    const newStudent = await Student.create({
      ...studentData,

      totalMonthFee: totalMonthFee,
      totalBusFee: totalBusFee,
      totalFee: totalFee,
    });
    // console.log(newStudent);
    console.log("Saved Student:", {
      totalMonthFee: newStudent.totalMonthFee,
      totalBusFee: newStudent.totalBusFee,
      totalFee: newStudent.totalFee,
    });
    return NextResponse.json(
      {
        success: true,
        message: "Student created successfully",
        // data: newStudent,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("POST STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}

/* ================= GET ALL STUDENTS ================= */
