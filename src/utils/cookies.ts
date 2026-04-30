import { Response } from "express";

export const attachCookiesToResponse = (response: Response, token: string) => {
  const oneDay = 1000 * 60 * 60 * 24;
  const isProduction = process.env.NODE_ENV === "production";

  response.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: isProduction,
    signed: true,
    sameSite: isProduction ? "none" : "lax",
  });
};
