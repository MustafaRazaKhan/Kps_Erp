import { NextResponse } from "next/server";

import connectDB from "@/utils/mongodb";
import Enquiry from "@/models/Enquiry";

export async function POST(req: Request) {
  try {
    // =====================================================
    // CONNECT DATABASE
    // =====================================================

    await connectDB();

    // =====================================================
    // GET REQUEST BODY
    // =====================================================

    const body = await req.json();

    const { name, email, phone, subject, comment, message } = body;

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Name is required",
        },
        { status: 400 },
      );
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Email is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // EMAIL VALIDATION
    // =====================================================

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide a valid email address",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // SUBJECT
    // =====================================================

    if (!subject || typeof subject !== "string" || !subject.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Subject is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // MESSAGE
    // =====================================================

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Message is required",
        },
        { status: 400 },
      );
    }

    // =====================================================
    // CREATE CONTACT
    // =====================================================

    const contact = await Enquiry.create({
      name: name.trim(),

      email: email.trim().toLowerCase(),

      phone: typeof phone === "string" ? phone.trim() : "",

      subject: subject.trim(),

      comment: typeof comment === "string" ? comment.trim() : "",

      message: message.trim(),

      // Explicitly set initial status
      status: "pending",
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,

        message: "Your message has been submitted successfully.",

        data: contact,
      },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("CONTACT POST ERROR:", error);

    // =====================================================
    // MONGOOSE VALIDATION ERROR
    // =====================================================

    if (error?.name === "ValidationError") {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid contact details.",
          errors: error.errors,
        },
        { status: 400 },
      );
    }

    // =====================================================
    // DUPLICATE KEY ERROR
    // =====================================================

    if (error?.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: "A record with these details already exists.",
        },
        { status: 409 },
      );
    }

    // =====================================================
    // INTERNAL SERVER ERROR
    // =====================================================

    return NextResponse.json(
      {
        success: false,
        message: error?.message || "Internal Server Error",
      },
      { status: 500 },
    );
  }
}
