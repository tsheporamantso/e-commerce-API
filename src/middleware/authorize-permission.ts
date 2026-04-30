import { Request, Response, NextFunction } from "express";
import CustomError from "../errors";

export const authorizePermission = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route",
      );
    }
    next();
  };
};
