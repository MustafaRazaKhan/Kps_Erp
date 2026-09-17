import ClassModel from "@/models/Class";
import { NextResponse } from "next/server";

export async function PUT(request: any, { params }: any) {
  const { id } = await params;
  console.log(id);
  const data = await request.json();
  console.log(data);
  const exsistClass = await ClassModel.findOne({
    name: data.name,
    section: data.section,
    no: data.no,
  });
  if (exsistClass) {
    return NextResponse.json({
      success: false,
      message: "Class Exsist Already!",
    });
  }
  const updateClass = await ClassModel.findByIdAndUpdate(id, data);
  return NextResponse.json({
    success: true,
    message: "Class Update Successfully!",
  });
}
