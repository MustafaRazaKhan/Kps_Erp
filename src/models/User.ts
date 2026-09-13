// import mongoose, { Document, Model } from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

// interface UserDocument extends Document {
//   name: string;
//   email: string;
//   password: string;
//   role: string;
// }

// interface UserModel extends Model<UserDocument> {
//   paginate: (query?: any, options?: any) => Promise<any>;
// }

// const userSchema = new mongoose.Schema<UserDocument>(
//   {
//     name: String,
//     email: String,
//     password: String,
//     role: String,
//   },
//   { timestamps: true }
// );

// userSchema.plugin(mongoosePaginate);

// const User =
//   (mongoose.models.User as UserModel) ||
//   mongoose.model<UserDocument, UserModel>("User", userSchema);

// export default User;

import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      default: "student",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

userSchema.plugin(mongoosePaginate);

const User = mongoose.models.User || mongoose.model("User", userSchema);
// User.paginate().then({});

export default User;
