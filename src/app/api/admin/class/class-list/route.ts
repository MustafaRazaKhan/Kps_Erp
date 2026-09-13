import ClassModel from "@/models/Class";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();

    const classList = await ClassModel.find();

    return NextResponse.json({
      success: true,
      data: classList,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json({
      success: false,
      message: error.message,
    });
  }
};
