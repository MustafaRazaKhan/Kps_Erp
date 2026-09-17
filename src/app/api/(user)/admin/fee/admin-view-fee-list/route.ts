import Fee from "@/models/Fee";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connectDB();

    const feeList = await Fee.find().sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        count: feeList.length,
        data: feeList,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
};
