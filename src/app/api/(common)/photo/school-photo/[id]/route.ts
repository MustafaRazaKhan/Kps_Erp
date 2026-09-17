import { NextRequest, NextResponse } from "next/server";
import School from "@/models/School";
import connectDB from "@/utils/mongodb";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  //   console.log(id);

  await connectDB();
  //   console.log(id);

  const school = await School.findById(id).select("image");
  //   console.log(school);

  if (!school || !school.image) {
    return new NextResponse("Image not found", { status: 404 });
  }

  return new NextResponse(school.image, {
    headers: {
      "Content-Type": "image/jpeg",
    },
  });
}
