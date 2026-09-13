import { NextResponse } from "next/server";
import Fee from "@/models/Fee";
import connectDB from "@/utils/mongodb";

/**
 * Create Fee Structure
 */
export const POST = async (req: Request) => {
  try {
    await connectDB();

    const body = await req.json();
    console.log(body);

    // Check duplicate
    // const existing = await FeeStructure.findOne({ feeGroup });

    // if (existing) {
    //   return NextResponse.json(
    //     {
    //       success: false,
    //       message: "Fee Structure already exists.",
    //     },
    //     { status: 400 },
    //   );
    // }

    const fee = await Fee.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Fee Structure created successfully.",
        // data: feeStructure,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error.",
      },
      { status: 500 },
    );
  }
};

/**
 * Get All Fee Structures
 */

/**
 * Get Single Fee Structure
 */
// export const getFeeStructureById = async (id) => {
//   try {
//     await connectDB();

//     const feeStructure = await FeeStructure.findById(id);

//     if (!feeStructure) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Fee Structure not found.",
//         },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         data: feeStructure,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error.",
//       },
//       { status: 500 },
//     );
//   }
// };

/**
 * Update Fee Structure
 */
// export const updateFeeStructure = async (request, id) => {
//   try {
//     await connectDB();

//     const body = await request.json();

//     const feeStructure = await FeeStructure.findByIdAndUpdate(id, body, {
//       new: true,
//       runValidators: true,
//     });

//     if (!feeStructure) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Fee Structure not found.",
//         },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Fee Structure updated successfully.",
//         data: feeStructure,
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error.",
//       },
//       { status: 500 },
//     );
//   }
// };

/**
 * Delete Fee Structure
 */
// export const deleteFeeStructure = async (id) => {
//   try {
//     await connectDB();

//     const feeStructure = await FeeStructure.findByIdAndDelete(id);

//     if (!feeStructure) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Fee Structure not found.",
//         },
//         { status: 404 },
//       );
//     }

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Fee Structure deleted successfully.",
//       },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal Server Error.",
//       },
//       { status: 500 },
//     );
//   }
// };
