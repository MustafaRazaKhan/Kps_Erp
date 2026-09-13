import Enquiry from "@/models/Enquiry";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

/* ================= CREATE ENQUIRY ================= */
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    // const result = validateData(EnquirySchema, body);
    // if (!result.success) {
    //   return NextResponse.json({
    //     success: result.success,
    //     message: "validation fail",
    //     errors: result.errors,
    //     // data: enquiry,
    //   });
    // }
    // console.log("err",err)
    // if(!result.success){

    // }
    // console.log(body)
    // console.log(enquiry)
    const exsistPhoneNumber = await Enquiry.findOne({ phone: body.phone });
    // console.log(exsistPhoneNumber);
    if (exsistPhoneNumber) {
      return NextResponse.json(
        {
          success: false,
          message: "Mobile Number Already Exsist",
          // data: enquiry,
        },
        {
          status: 400,
        },
      );
    }

    await Enquiry.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Enquiry submitted",
      },
      {
        status: 201,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}

/* ================= GET ALL ENQUIRIES ================= */
export async function GET() {
  try {
    await connectDB();

    // const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    const enquiries = await Enquiry.find().sort();

    return NextResponse.json(
      {
        success: true,
        data: enquiries,
        totalEnquiries: enquiries.length,
      },
      {
        status: 200,
      },
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 },
    );
  }
}
