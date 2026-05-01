import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/ProductInterface";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxLength: [100, "Product name cannot be more than 100 characters."],
    },
    price: {
      type: Number,
      required: [true, "please provide product price"],
      default: 0,
    },
    description: {
      type: String,
      required: [true, "Please provide product description"],
      maxLength: [
        1000,
        "Product description cannot be more than 1000 characters",
      ],
    },
    image: {
      type: String,
      default: "uploads/example.jpeg",
    },
    category: {
      type: String,
      required: [true, "Please provide product description"],
      enum: {
        values: ["office", "kitchen", "bedroom"],
        message: "{VALUE} is no supported",
      },
    },
    company: {
      type: String,
      required: [true, "Please provide company name"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      default: ["#222"],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<IProduct>("Product", ProductSchema);
