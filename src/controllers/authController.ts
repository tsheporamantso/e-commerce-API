import { asyncWrapper } from "../middleware/async";
import { StatusCodes } from "http-status-codes";

export const register = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("user registered");
});

export const login = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("login user");
});

export const logout = asyncWrapper(async (req, res) => {
  res.status(StatusCodes.OK).json("logout user");
});
