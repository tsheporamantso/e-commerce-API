import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

export const NotFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ msg: "Resource not found" });
};
