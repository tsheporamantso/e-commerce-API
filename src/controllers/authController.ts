import CustomError from "../errors";
import User from "../models/userModel";
import { StatusCodes } from "http-status-codes";
import { asyncWrapper } from "../middleware/async";
import { attachCookiesToResponse } from "../utils/cookies";

export const register = asyncWrapper(async (req, res) => {
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? "admin" : "user";

  const user = await User.create({ ...req.body, role });
  const token = user.createJWT();

  attachCookiesToResponse(res, token);

  res.status(StatusCodes.CREATED).json({
    user: {
      userId: user._id,
      name: user.name,
      role: user.role,
    },
  });
});

export const login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new CustomError.BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new CustomError.UnauthenticatedError("Invalid credentials");
  }

  const token = user.createJWT();
  attachCookiesToResponse(res, token);

  res.status(StatusCodes.OK).json({
    user: {
      userId: user._id,
      name: user.name,
      role: user.role,
    },
  });
});

export const logout = asyncWrapper(async (req, res) => {
  res.cookie("token", "token", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out successfully." });
});
