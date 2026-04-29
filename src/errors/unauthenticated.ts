import { StatusCodes } from "http-status-codes";
import { CustomErrorAPI } from "./custom-error";

export class UnauthenticatedError extends CustomErrorAPI {
  constructor(message: string, statusCode: number = StatusCodes.UNAUTHORIZED) {
    super(message, statusCode);
  }
}
