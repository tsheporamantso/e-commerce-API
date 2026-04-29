import { StatusCodes } from "http-status-codes";
import { CustomErrorAPI } from "./custom-error";

export class UnauthorizedError extends CustomErrorAPI {
  constructor(message: string, statusCode: number = StatusCodes.FORBIDDEN) {
    super(message, statusCode);
  }
}
