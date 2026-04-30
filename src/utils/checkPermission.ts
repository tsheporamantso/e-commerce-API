import CustomError from "../errors";
import { AuthUser } from "./getAuthUser";

export const checkPermission = (
  requestUser: AuthUser,
  resourceUserId: string,
) => {
  if (requestUser.role === "admin") return;
  if (requestUser.userId === resourceUserId.toString()) return;
  throw new CustomError.UnauthorizedError(
    "Not authorized to access this route",
  );
};
