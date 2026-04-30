import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";
import User from "../models/userModel";
import { attachCookiesToResponse } from "../utils/cookies";

export const register = asyncWrapper(async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ ...req.body, role });
  const token = user.createJWT();

  attachCookiesToResponse(res, token);

  res.status(StatusCodes.CREATED).json({
    user: { name: user.name, userId: user._id, role: user.role },
  });
});

export const login = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("login user");
});

export const logout = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("logout user");
});
