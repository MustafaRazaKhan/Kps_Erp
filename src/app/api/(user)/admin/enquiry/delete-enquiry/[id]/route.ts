import Enquiry from "@/models/Enquiry";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    // Get ID from dynamic route
    const { id } = await params;

    console.log(id, "params");
    const data = await Enquiry.findByIdAndDelete(id);

    return NextResponse.json(
      {
        success: true,
        id,
        message: "Enquiry deleted successfully",
      },
      { status: 200 },
    );
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
