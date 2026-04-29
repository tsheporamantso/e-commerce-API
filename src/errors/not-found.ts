import { CustomErrorAPI } from "./custom-error";
import { StatusCodes } from "http-status-codes";

export class NotFoundError extends CustomErrorAPI {
  constructor(message: string, statusCode: number = StatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}
