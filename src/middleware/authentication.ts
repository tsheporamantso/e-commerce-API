import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import CustomError from "../errors";
import { getEnvVariable } from "../utils/env";

interface JWTPayloadType {
  userId: string;
  name: string;
  role: string;
}

export const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.signedCookies.token || req.cookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload = jwt.verify(
      token,
      getEnvVariable("JWT_SECRET"),
    ) as JWTPayloadType;
    req.user = {
      userId: payload.userId,
      name: payload.name,
      role: payload.role,
    };
    next();
  } catch (error) {
    console.log(error);
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }
};
