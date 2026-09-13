// models/School.ts
import mongoose, { Schema, model, models } from "mongoose";

// export interface ISchool extends Document {
//   name: string;
//   code?: string;
//   email: string;
//   contact?: string;
//   address?: string;
//   image?: Buffer; // store image binary, or use string for URL
// }

const SchoolSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String },
    email: { type: String, required: true },
    contact: { type: String },
    address: { type: String },
    image: { type: Buffer }, // can also be { type: String } for URL
  },
  { timestamps: true },
);

// Prevent model overwrite on hot reload in Next.js
const School = models.School || model("School", SchoolSchema);
export default School;
