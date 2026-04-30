import CustomError from "../errors";
import { Request } from "express";

export type AuthUser = NonNullable<Request["user"]>;

export const getAuthUser = (req: Request): AuthUser => {
  if (!req.user) {
    throw new CustomError.UnauthenticatedError("Authentication required");
  }
  return req.user;
};
