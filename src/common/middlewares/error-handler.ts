import { ErrorRequestHandler, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { CustomError, throwError } from "../errors.js";
import { errorResponse } from "../response.js";

export const notFoundHandler: RequestHandler = (req) => {
  throwError(
    StatusCodes.NOT_FOUND,
    "COMMON404",
    `${req.method} ${req.originalUrl} 경로를 찾을 수 없습니다.`
  );
};

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json(errorResponse(err.code, err.message, err.details ?? null));
  }

  console.error(err);

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorResponse("COMMON500", "서버 내부 오류가 발생했습니다."));
};
