import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import Product from "../models/ProductModel";
import { getAuthUser } from "../utils/getAuthUser";
import { UploadedFile } from "express-fileupload";
import path from "path";

export const createProduct = asyncWrapper(async (req, res) => {
  const authUser = getAuthUser(req);

  req.body = req.body || {};
  req.body.user = authUser.userId;

  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
});

export const getAllProducts = asyncWrapper(async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json({ nbHits: products.length, products });
});

export const getSingleProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
});

export const updateProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    returnDocument: "after",
    runValidators: true,
  });
  if (!product) {
    throw new CustomError.NotFoundError(`no product with id: ${productId}`);
  }
  res.status(StatusCodes.OK).json({ product });
});

export const deleteProduct = asyncWrapper(async (req, res) => {
  const { id: productId } = req.params;

  const product = await Product.findOne({ _id: productId });
  if (!product) {
    throw new CustomError.NotFoundError(`No product with id: ${productId}`);
  }

  await product.deleteOne();
  res
    .status(StatusCodes.OK)
    .json({ success: true, msg: "Product deleted successfully." });
});

export const uploadImage = asyncWrapper(async (req, res) => {
  if (!req.files) {
    throw new CustomError.BadRequestError("No file uploaded");
  }
  const productImage = req.files.image as UploadedFile;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomError.BadRequestError("Please upload image");
  }
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      "Please upload image smaller than 1MB",
    );
  }

  const imagePath = path.join(
    __dirname,
    "../../public/uploads/",
    productImage.name,
  );

  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
});
