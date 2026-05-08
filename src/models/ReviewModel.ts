import mongoose, { Schema, Types } from "mongoose";
import { IReview, IReviewModel } from "../types/ReviewInterface";

const ReviewSchema = new Schema(
  {
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },
    title: {
      type: String,
      trim: true,
      required: [true, "Please provide title"],
      maxLength: [100, "Review title cannot be more than 100 characters"],
    },
    comment: {
      type: String,
      required: [true, "Please provide review comment"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide user"],
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Please provide product"],
    },
  },
  { timestamps: true },
);

// user must leave one review per product(Compound index for user and product)
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

ReviewSchema.statics.calculateAverageRating = async function (
  productId: Types.ObjectId,
) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
        numOfReviews: {
          $sum: 1,
        },
      },
    },
  ]);
  console.log(result);
  try {
    await mongoose.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: Math.ceil(result[0]?.averageRating || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      },
    );
  } catch (error) {
    console.log(error);
  }
};

ReviewSchema.post("save", async function () {
  await (this.constructor as IReviewModel).calculateAverageRating(this.product);
});

ReviewSchema.post(
  "deleteOne",
  { document: true, query: false },
  async function () {
    await (this.constructor as IReviewModel).calculateAverageRating(
      this.product,
    );
  },
);

export default mongoose.model<IReview>("Review", ReviewSchema);
