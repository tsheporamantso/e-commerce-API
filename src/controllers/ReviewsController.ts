import CustomError from "../errors";
import Review from "../models/ReviewModel";
import Product from "../models/ProductModel";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { getAuthUser } from "../utils/getAuthUser";
import { checkPermission } from "../utils/checkPermission";

export const getAllReviews = asyncWrapper(async (req, res) => {
  const reviews = await Review.find({})
    .populate({
      path: "product",
      select: "name company price",
    })
    .populate({ path: "user", select: "name role" });
  res.status(StatusCodes.OK).json({ nbHits: reviews.length, reviews });
});

export const getSingleReview = asyncWrapper(async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId })
    .populate({
      path: "product",
      select: "name company price",
    })
    .populate({ path: "user", select: "name role" });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
  }

  res.status(StatusCodes.OK).json({ review });
});

export const createReview = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);
  req.body = req.body || {};

  const { product: productId } = req.body;
  const isValidProduct = await Product.findOne({ _id: productId });

  if (!isValidProduct) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  const alreadySubmitted = await Review.findOne({
    product: productId,
    user: authUser.userId,
  });

  if (alreadySubmitted) {
    throw new CustomError.BadRequestError(
      "Already submitted review for this product",
    );
  }

  req.body.user = authUser.userId;
  const review = await Review.create(req.body);
  res.status(StatusCodes.CREATED).json({ review });
});

export const updateReview = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);
  const { id: reviewId } = req.params;

  const { rating, title, comment } = req.body;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
  }
  checkPermission(authUser, review.user);

  review.rating = rating;
  review.title = title;
  review.comment = comment;

  await review.save();
  res.status(StatusCodes.OK).json({ review });
});

export const deleteReview = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);
  const { id: reviewId } = req.params;

  const review = await Review.findOne({ _id: reviewId });

  if (!review) {
    throw new CustomError.NotFoundError(`No review with id: ${reviewId}`);
  }

  checkPermission(authUser, review.user);

  await review.deleteOne();

  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "review deleted successfully" });
});

export const getSingleProductReviews = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;

  const reviews = await Review.find({ product: productId }).populate({
    path: "user",
    select: "name role",
  });
  res.status(StatusCodes.OK).json({ nbHits: reviews.length, reviews });
});
