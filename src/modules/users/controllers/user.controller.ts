import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";
import { UserSignUpRequest } from "../dtos/user.dto.js";

export const handleUserSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body);

  const user = await userSignUp(req.body as UserSignUpRequest);

  res.status(StatusCodes.OK).json({ result: user });
};