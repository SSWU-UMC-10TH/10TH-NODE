import {
  Body,
  Controller,
  Post,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { userSignUp } from "../services/user.service.js";
import { UserSignUpRequest, UserSignUpResponse } from "../dtos/user.dto.js";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  successResponse,
} from "../../../common/response.js";

@Route("users")
@Tags("User")
export class UserController extends Controller {
  /**
   * 회원가입 API
   * @summary 신규 회원을 생성합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "회원가입 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "회원가입 필수값 누락")
  @Response<ApiErrorResponse>(StatusCodes.CONFLICT, "이미 존재하는 이메일")
  @Post("/signup")
  public async signUp(
    @Body() data: UserSignUpRequest
  ): Promise<ApiSuccessResponse<UserSignUpResponse>> {
    const user = await userSignUp(data);

    this.setStatus(StatusCodes.CREATED);
    // 피드백 반영: 생성 응답은 HTTP 201과 내부 응답 코드 COMMON201을 함께 사용합니다.
    return successResponse("COMMON201", user, "회원가입에 성공했습니다.");
  }
}
