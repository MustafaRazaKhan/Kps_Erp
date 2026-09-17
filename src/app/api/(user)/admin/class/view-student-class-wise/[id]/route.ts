import { Student } from "@/models/Student";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const students = await Student.find({
      classId: id,
    }).select("-photo");
    console.log(students);

    return NextResponse.json({
      success: true,
      students,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch students",
      },
      { status: 500 },
    );
  }
}
