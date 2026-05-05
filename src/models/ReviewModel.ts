import mongoose, { Schema } from "mongoose";
import { IReview } from "../types/ReviewInterface";

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      required: [true, "Please provide title"],
      maxLength: [100, "Review title cannot be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide review comment"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product"],
    },
  },
  { timestamps: true },
);

export default mongoose.model<IReview>("Review", ReviewSchema);
