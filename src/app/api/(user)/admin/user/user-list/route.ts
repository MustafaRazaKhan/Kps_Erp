import User from "@/models/User";
import connectDB from "@/utils/mongodb";
import { NextResponse } from "next/server";

export const GET = async (req: Request) => {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const page = Number(searchParams.get("page")) || 1;
    const limit = Number(searchParams.get("limit")) || 10;
    // console.log(page)
    const options = {
      page: page,
      limit: limit,
    };

    console.log(page);
    // console.log({ page=1, limit=4 });
    const data = await (User as any).paginate({}, options);
    // console.log(data)

    // const { searchParams } = new URL(req.url);

    // const page = Number(searchParams.get("page")) || 1;
    // const limit = Number(searchParams.get("limit")) || 10;

    // const role = searchParams.get("role");
    // const search = searchParams.get("search");

    // const skip = (page - 1) * limit;

    // // 🧠 BUILD QUERY DYNAMICALLY
    // const query: any = {};

    // // 🔍 ROLE FILTER
    // if (role) {
    //   query.role = role;
    // }

    // // 🔍 SEARCH FILTER (name or email)
    // if (search) {
    //   query.$or = [
    //     { name: { $regex: search, $options: "i" } },
    //     { email: { $regex: search, $options: "i" } },
    //   ];
    // }

    // // 📦 DATA QUERY
    // const users = await User.find(query)
    //   .skip(skip)
    //   .limit(limit)
    //   .sort({ createdAt: -1 });

    // // 📊 TOTAL COUNT (with filters applied)
    // const total = await User.countDocuments(query);

    return NextResponse.json({
      success: true,
      message: "Users fetched successfully",
      data: data.docs,

      totalDocs: data.totalDocs,
      limit: data.limit,
      totalPages: data.totalPages,
      page: data.page,
      counter: data.pagingCounter,
      hasPrevPage: data.hasPrevPage,
      hasNextPage: data.hasNextPage,
      prevPage: data.prevPage,
      nextPage: data.nextPage,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, msg: "Server Error" },
      { status: 500 },
    );
  }
};
