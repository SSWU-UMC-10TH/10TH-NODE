import { Request, RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { errorResponse } from "../response.js";
import { verifyAccessToken } from "../utils/jwt.js";

export interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const extractBearerToken = (authorization?: string): string | null => {
  if (!authorization) {
    return null;
  }

  const [type, token] = authorization.split(" ");

  if (type !== "Bearer" || !token) {
    return null;
  }

  return token;
};

export const authMiddleware: RequestHandler = (req, res, next) => {
  const authenticatedReq = req as AuthenticatedRequest;
  const token = extractBearerToken(authenticatedReq.headers.authorization);

  if (!token) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(errorResponse("AUTH401", "로그인이 필요한 API입니다."));
    return;
  }

  try {
    const payload = verifyAccessToken(token);
    authenticatedReq.user = {
      id: payload.userId,
      email: payload.email,
    };
    next();
  } catch {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json(errorResponse("AUTH401", "유효하지 않은 토큰입니다."));
    return;
  }
};
