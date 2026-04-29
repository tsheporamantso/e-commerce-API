import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  next,
) => {
  if (err instanceof CustomError.CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong please try again" });
};
