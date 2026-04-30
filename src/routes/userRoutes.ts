import express from "express";
import { authenticateUser } from "../middleware/authentication";
import { authorizePermission } from "../middleware/authorize-permission";

const router = express.Router();

import {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
  deleteUser,
} from "../controllers/usersController";

router
  .route("/")
  .get(authenticateUser, authorizePermission("admin"), getAllUsers);

router.route("/showMe").get(authenticateUser, showCurrentUser);
router.route("/updateUser").patch(authenticateUser, updateUser);
router.route("/updateUserPassword").patch(authenticateUser, updateUserPassword);

router.route("/:id").get(authenticateUser, getSingleUser);
router
  .route("/:id")
  .delete(authenticateUser, authorizePermission("admin"), deleteUser);

export default router;
