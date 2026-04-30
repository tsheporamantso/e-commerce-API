import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt, { SignOptions } from "jsonwebtoken";
import { getEnvVariable } from "../utils/env";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  createJWT: () => string;
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

UserSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const options: SignOptions = {
  expiresIn: getEnvVariable("JWT_EXPIRES_IN") as SignOptions["expiresIn"],
};

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { name: this.name, email: this.email, role: this.role },
    getEnvVariable("JWT_SECRET"),
    options,
  );
};

export default mongoose.model<IUser>("User", UserSchema);
