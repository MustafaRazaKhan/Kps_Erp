import { Student } from "@/models/Student";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";
import ClassModel from "@/models/Class";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    // console.log("Class model:", ClassModel.modelName);

    // console.log("REGISTERED MODELS:", mongoose.modelNames());

    // console.log("REGISTERED MODELS:", mongoose.modelNames());

    const students = await Student.find()
      .select("-photo")
      .sort({ createdAt: -1 })
      .populate({
        path: "classId",
        model: ClassModel,
      });

    // console.log("STUDENTS:", students);

    return NextResponse.json(
      {
        success: true,
        count: students.length,
        data: students,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET STUDENTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch students",
      },
      { status: 500 },
    );
  }
}
