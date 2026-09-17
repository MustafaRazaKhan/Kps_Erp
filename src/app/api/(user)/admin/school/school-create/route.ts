import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/utils/mongodb";
import School from "@/models/School";

export const POST = async (req: NextRequest) => {
  try {
    // Connect to the database
    await connectDB();

    // Parse multipart/form-data
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const code = formData.get("code") as string;
    const email = formData.get("email") as string;
    const contact = formData.get("contact") as string;
    const address = formData.get("address") as string;
    const imageFile = formData.get("image") as File | null;
    if (!imageFile) {
      return NextResponse.json(
        { success: false, message: "Photo is required" },
        { status: 400 },
      );
    }

    const photoBuffer = Buffer.from(await imageFile.arrayBuffer());
    const exsistSchool = await School.find();
    if (exsistSchool.length > 0) {
      return NextResponse.json({
        success: false,
        message: "School Alredy Exsist",
      });
    }

    // Create school
    const savedSchool = await School.create({
      name,
      email,
      contact,
      code,
      address,
      image: photoBuffer,
    });

    return NextResponse.json({
      success: true,
      message: "School Saved Successfully",
      data: savedSchool,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Failed to create school" },
      { status: 500 },
    );
  }
};


