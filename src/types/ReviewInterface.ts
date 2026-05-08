import { Document, Model, Types } from "mongoose";

export interface IReview extends Document {
  rating: number;
  title: string;
  comment: string;
  user: Types.ObjectId;
  product: Types.ObjectId;
}

export interface IReviewModel extends Model<IReview> {
  calculateAverageRating(productId: Types.ObjectId): Promise<void>;
}
