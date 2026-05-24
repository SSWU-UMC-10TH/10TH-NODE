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
    // 피드백 반영: 운영 로그를 추적하기 쉽도록 에러 로그 포맷을 통일합니다.
    console.error({
      level: "error",
      method: req.method,
      path: req.originalUrl,
      statusCode: err.statusCode,
      code: err.code,
      message: err.message,
      details: err.details ?? null,
    });

    return res
      .status(err.statusCode)
      .json(errorResponse(err.code, err.message, err.details ?? null));
  }

  // 피드백 반영: 예상하지 못한 에러도 동일한 로그 구조로 남깁니다.
  console.error({
    level: "error",
    method: req.method,
    path: req.originalUrl,
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    code: "COMMON500",
    message: err instanceof Error ? err.message : "Unknown error",
    details: err,
  });

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json(errorResponse("COMMON500", "서버 내부 오류가 발생했습니다."));
};
