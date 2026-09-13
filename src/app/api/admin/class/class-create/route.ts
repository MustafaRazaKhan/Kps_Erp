import ClassModel from "@/models/Class";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { name, section, no } = await req.json();
    // console.log(await req.json())

    if (!name || !section || !no) {
      return NextResponse.json({
        success: false,
        msg: "All fields are required",
      });
    }

    const existClass = await ClassModel.findOne({ name, section });

    if (existClass) {
      return NextResponse.json(
        {
          success: false,
          message: "Class with this section already exists!",
        },
        {
          status: 400,
        },
      );
    }

    const savedClass = await ClassModel.create({
      name,
      section,
      no,
    });

    return NextResponse.json({
      success: true,
      message: "Class added successfully!",
      data: savedClass,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: error.message,
      },
      {
        status: 400,
      },
    );
  }
};
