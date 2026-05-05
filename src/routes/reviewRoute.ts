import express from "express";
import { authenticateUser } from "../middleware/authentication";
import { authorizePermission } from "../middleware/authorize-permission";

const router = express.Router();

import {
  getAllReviews,
  getSingleReview,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/ReviewsController";

router
  .route("/")
  .get(getAllReviews)
  .post([authenticateUser, authorizePermission("admin")], createReview);
router
  .route("/:id")
  .get(getSingleReview)
  .patch([authenticateUser, authorizePermission("admin")], updateReview)
  .delete([authenticateUser, authorizePermission("admin")], deleteReview);

export default router;
