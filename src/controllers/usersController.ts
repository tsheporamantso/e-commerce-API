import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";

export const getAllUsers = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get all users" });
});
export const getSingleUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "get single users" });
});
export const showCurrentUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "show current user" });
});
export const updateUser = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update users" });
});
export const updateUserPassword = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "update user password" });
});
