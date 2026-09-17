import Enquiry from "@/models/Enquiry";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const data = await request.json();

    // console.log("ID:", id);
    const enquiryUpdate = await Enquiry.findByIdAndUpdate(id, {
      //   phone: "9999999",

      status: "Updated",
      comment: data,
    });
    // console.log(d);

    return NextResponse.json({
      success: true,
      message: "Enquiry Updated Successfully!",
      data: enquiryUpdate,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 },
    );
  }
}
