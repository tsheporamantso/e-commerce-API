import express from "express";
import { authenticateUser } from "../middleware/authentication";

const router = express.Router();

import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/ReviewsController";

router.route("/").get(getAllReviews).post(authenticateUser, createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch(authenticateUser, updateReview)
  .delete(authenticateUser, deleteReview);

export default router;
