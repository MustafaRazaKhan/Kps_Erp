import Enquiry from "@/models/Enquiry";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // =====================================================
    // CONNECT DATABASE
    // =====================================================

    await connectDB();

    // =====================================================
    // GET ALL CONTACTS
    // =====================================================

    const contacts = await Enquiry.find().sort({ createdAt: -1 }).lean();

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message: "Contacts fetched successfully",
        count: contacts.length,
        data: contacts,
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("GET CONTACTS ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
