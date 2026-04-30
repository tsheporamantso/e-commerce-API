import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
}

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Please provide a valid email address",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minLength: 10,
    },
    role: {
      type: String,
      enum: {
        values: ["admin", "user"],
        message: "{VALUE} is not supported",
      },
      default: "user",
    },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>("User", UserSchema);
