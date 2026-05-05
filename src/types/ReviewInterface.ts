import { Document } from "mongoose";

export interface IReview extends Document {
  rating: number;
  title: string;
  comment: string;
  user: string;
  product: string;
}
