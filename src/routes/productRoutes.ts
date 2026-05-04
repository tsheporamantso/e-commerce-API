import { Router } from "express";
import { authenticateUser } from "../middleware/authentication";
import { authorizePermission } from "../middleware/authorize-permission";

const router = Router();

import {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} from "../controllers/productController";

router
  .route("/")
  .get(getAllProducts)
  .post([authenticateUser, authorizePermission("admin")], createProduct);
router
  .route("/uploadImage")
  .post([authenticateUser, authorizePermission("admin")], uploadImage);
router
  .route("/:id")
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermission("admin")], updateProduct)
  .delete([authenticateUser, authorizePermission("admin")], deleteProduct);

export default router;
