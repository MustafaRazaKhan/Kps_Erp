import { Student } from "@/models/Student";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/utils/mongodb";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();

    const { id } = await params;
    console.log("id", typeof id);
    // co

    console.log("Student ID:", id);

    // ✅ Validate MongoDB ID

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid Student ID",
        },
        { status: 400 },
      );
    }

    // ✅ Find Student
    // const objectId = new mongoose.Types.ObjectId(id);

    // const student = await Student.findById(objectId)
    //   .populate("userId")
    //   .populate("classId");

    const student = await Student.findById(id)
      .populate("userId")
      .populate("classId");

    // ✅ Student Not Found

    // console.log(student);

    if (!student) {
      return NextResponse.json(
        {
          success: false,
          message: "Student Not Found",
        },
        { status: 404 },
      );
    }

    // ✅ Success

    return NextResponse.json(
      {
        success: true,
        message: "Student Fetched Successfully",
        data: student,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.log("GET STUDENT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
};
