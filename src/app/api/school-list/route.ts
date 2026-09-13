import School from "@/models/School";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // await connectDb();
    await connectDB();

    const schools = await School.find()
      .select("-photo")
      .sort({ createdAt: -1 });

    // console.log(schools)

    return NextResponse.json({
      success: true,
      data: schools,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch schools" },
      { status: 500 },
    );
  }
};
