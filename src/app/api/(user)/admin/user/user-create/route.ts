import User from "@/models/User";
import connectDB from "@/utils/mongodb";
import { hashedPassword } from "@/utils/password";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  try {
    await connectDB();

    const { name, email, password, role } = await req.json();

    // ✅ Basic validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    // ✅ Check existing user (by email)
    const existUser = await User.findOne({ email });
    if (existUser) {
      return NextResponse.json(
        { success: false, message: "Email already exists" },
        { status: 400 },
      );
    }

    // ✅ Hash password
    const hashed = await hashedPassword(password);

    // ✅ Create user (default role only)
    const user = await User.create({
      name,
      email,
      password: hashed,
      role: role, // never trust frontend
    });

    return NextResponse.json({
      success: true,
      message: "Account Created Successfully",
      userId: user._id,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Server Error" },
      { status: 400 },
    );
  }
};
