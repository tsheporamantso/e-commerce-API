import { ErrorRequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomErrorAPI } from "../errors/custom-error";

export const errorHandlerMiddleware: ErrorRequestHandler = (
  err,
  req,
  res,
  _next,
) => {
  if (err instanceof CustomErrorAPI) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ msg: "Something went wrong please try again" });
};
