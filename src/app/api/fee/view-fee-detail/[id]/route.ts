import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import Fee from "@/models/Fee";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    await connectDB();

    const feeStructure = await Fee.findById(id);
    console.log(feeStructure);

    if (!feeStructure) {
      return NextResponse.json(
        {
          success: false,
          message: "Fee Structure not found.",
        },
        { status: 404 },
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: feeStructure,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Get Fee Structure Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
}
