import { Request, Response } from "express";
import { Body, Controller, Post, Route, SuccessResponse, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";
import { UserSignUpRequest } from "../dtos/user.dto.js";
import { successResponse } from "../../../common/response.js";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "회원가입 성공")
  @Post("/signup")
  public async signUp(@Body() data: UserSignUpRequest) {
    const user = await userSignUp(data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse(user, "회원가입에 성공했습니다.");
  }
}

export const handleUserSignUp = async (req: Request, res: Response) => {
  const result = await new UserController().signUp(req.body as UserSignUpRequest);

  res.status(StatusCodes.CREATED).json(result);
};
