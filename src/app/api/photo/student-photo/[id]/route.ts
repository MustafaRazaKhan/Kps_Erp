import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import { Student } from "@/models/Student";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  console.log("photo id", id);

  //   console.log(id);

  await connectDB();
  //   console.log(id);

  const student = await Student.findById(id).select("photo");
  // console.log(student);

  if (!student || !student.photo) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(student.photo.data, {
    headers: {
      "Content-Type": "image",
    },
  });
}
