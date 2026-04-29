import { Request, Response, NextFunction } from "express";

export type AsyncController = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

export const asyncWrapper = (fn: AsyncController) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
