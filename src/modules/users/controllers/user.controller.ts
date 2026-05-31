import {
  Body,
  Controller,
  Get,
  Header,
  Patch,
  Post,
  Request,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
  getMyProfile,
  refreshAccessToken,
  updateMyProfile,
  userLogin,
  userSignUp,
} from "../services/user.service.js";
import {
  RefreshTokenRequest,
  TokenResponse,
  UserLoginRequest,
  UserProfileResponse,
  UserProfileUpdateRequest,
  UserSignUpRequest,
  UserSignUpResponse,
} from "../dtos/user.dto.js";
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
   * @summary 신규 회원을 생성하거나 이미 존재하는 회원 정보를 갱신합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "회원가입 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "회원가입 필수값 누락")
  @Post("/signup")
  public async signUp(
    @Body() data: UserSignUpRequest
  ): Promise<ApiSuccessResponse<UserSignUpResponse>> {
    const user = await userSignUp(data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse("COMMON201", user, "회원가입에 성공했습니다.");
  }

  /**
   * 로그인 API
   * @summary 이메일과 비밀번호로 로그인하고 JWT Access/Refresh Token을 발급합니다.
   */
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "로그인 필수값 누락")
  @Response<ApiErrorResponse>(StatusCodes.UNAUTHORIZED, "로그인 실패")
  @Post("/login")
  public async login(
    @Body() data: UserLoginRequest
  ): Promise<ApiSuccessResponse<TokenResponse>> {
    const tokens = await userLogin(data);

    return successResponse("COMMON200", tokens, "로그인에 성공했습니다.");
  }

  /**
   * Access Token 재발급 API
   * @summary Refresh Token으로 새로운 Access/Refresh Token을 발급합니다.
   */
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "Refresh Token 누락")
  @Response<ApiErrorResponse>(StatusCodes.UNAUTHORIZED, "유효하지 않은 토큰")
  @Post("/refresh")
  public async refresh(
    @Body() data: RefreshTokenRequest
  ): Promise<ApiSuccessResponse<TokenResponse>> {
    const tokens = await refreshAccessToken(data);

    return successResponse("COMMON200", tokens, "토큰 재발급에 성공했습니다.");
  }

  /**
   * 내 정보 조회 API
   * @summary Bearer Token으로 로그인한 사용자의 정보를 조회합니다.
   */
  @Response<ApiErrorResponse>(StatusCodes.UNAUTHORIZED, "로그인 필요")
  @Get("/me")
  public async getMe(
    @Request() req: any,
    @Header("Authorization") _authorization?: string
  ): Promise<ApiSuccessResponse<UserProfileResponse>> {
    const profile = await getMyProfile(req.user!.id);

    return successResponse("COMMON200", profile);
  }

  /**
   * 내 정보 수정 API
   * @summary Bearer Token으로 로그인한 사용자의 전화번호, 생일, 선호 카테고리 등을 수정합니다.
   */
  @Response<ApiErrorResponse>(StatusCodes.UNAUTHORIZED, "로그인 필요")
  @Patch("/me")
  public async updateMe(
    @Request() req: any,
    @Body() data: UserProfileUpdateRequest,
    @Header("Authorization") _authorization?: string
  ): Promise<ApiSuccessResponse<UserProfileResponse>> {
    const profile = await updateMyProfile(req.user!.id, data);

    return successResponse("COMMON200", profile, "내 정보 수정에 성공했습니다.");
  }
}
