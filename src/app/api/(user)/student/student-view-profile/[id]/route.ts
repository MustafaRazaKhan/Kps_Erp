import { Student } from "@/models/Student";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/utils/mongodb";
import User from "@/models/User";
import ClassModel from "@/models/Class";

export const GET = async (
  req: Request,
  { params }: { params: { id: string } },
) => {
  try {
    await connectDB();

    const { id } = await params;
    console.log("id", id, typeof id);

    // co

    // console.log("Student ID:", id);

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

    const findStudentId = await User.findOne({ _id: id });
    console.log(findStudentId._id);
    if (!findStudentId) {
      return NextResponse.json({
        success: false,
        message: "Stundet Not found by userId",
      });
    }

    const student = await Student.findOne({ userId: findStudentId._id })
      .populate({
        path: "classId",
        model: ClassModel,
      })
      .populate({
        path: "userId",
        model: User,
      });
    // .populate("userId")
    // .populate("classId");

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
