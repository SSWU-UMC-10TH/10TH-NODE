import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Response,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import {
  ApiErrorResponse,
  ApiSuccessResponse,
  successResponse,
} from "../../../common/response.js";
import {
  completeMissionService,
  createMission,
  createReview,
  getMissionsByStoreService,
  getMyReviewsService,
} from "../services/store.service.js";
import {
  AddMissionRequest,
  AddReviewRequest,
  ReviewListResponse,
  StoreMissionResponse,
  UserMissionResponse,
  responseFromReviews,
} from "../dtos/store.dto.js";

@Route("")
@Tags("Store")
export class StoreController extends Controller {
  /**
   * 리뷰 등록 API
   * @summary 특정 가게에 리뷰를 등록합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "리뷰 등록 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "가게 ID 또는 리뷰 필수값 오류")
  @Response<ApiErrorResponse>(StatusCodes.NOT_FOUND, "존재하지 않는 가게")
  @Post("stores/{storeId}/reviews")
  public async addReview(
    @Path() storeId: number,
    @Body() data: AddReviewRequest
  ): Promise<ApiSuccessResponse<null>> {
    await createReview(storeId, data);

    this.setStatus(StatusCodes.CREATED);
    // 피드백 반영: 생성 응답의 HTTP status와 내부 응답 코드를 분리합니다.
    return successResponse("COMMON201", null, "리뷰 등록에 성공했습니다.");
  }

  /**
   * 미션 등록 API
   * @summary 특정 가게에 미션을 등록합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "미션 등록 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "가게 ID 또는 미션 필수값 오류")
  @Response<ApiErrorResponse>(StatusCodes.NOT_FOUND, "존재하지 않는 가게")
  @Post("stores/{storeId}/missions")
  public async addMission(
    @Path() storeId: number,
    @Body() data: AddMissionRequest
  ): Promise<ApiSuccessResponse<null>> {
    await createMission(storeId, data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse("COMMON201", null, "미션 등록에 성공했습니다.");
  }

  /**
   * 내 리뷰 목록 조회 API
   * @summary 회원이 작성한 리뷰 목록을 커서 기반으로 조회합니다.
   */
  @Response<ApiSuccessResponse<ReviewListResponse>>(StatusCodes.OK, "내 리뷰 목록 조회 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "회원 ID 또는 커서 값 오류")
  @Get("reviews/my")
  public async getMyReviews(
    @Query() userId = 1,
    @Query() cursor?: number
  ): Promise<ApiSuccessResponse<ReviewListResponse>> {
    const reviews = await getMyReviewsService(userId, cursor);

    return successResponse("COMMON200", responseFromReviews(reviews));
  }

  /**
   * 가게 미션 목록 조회 API
   * @summary 특정 가게의 미션 목록을 조회합니다.
   */
  @Response<ApiSuccessResponse<StoreMissionResponse[]>>(StatusCodes.OK, "가게 미션 목록 조회 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "가게 ID 오류")
  @Get("stores/{storeId}/missions")
  public async getStoreMissions(
    @Path() storeId: number
  ): Promise<ApiSuccessResponse<StoreMissionResponse[]>> {
    const missions = await getMissionsByStoreService(storeId);

    return successResponse("COMMON200", missions);
  }

  /**
   * 미션 완료 API
   * @summary 도전 중인 미션을 완료 상태로 변경합니다.
   */
  @Response<ApiSuccessResponse<UserMissionResponse | null>>(StatusCodes.OK, "미션 완료 처리 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "회원 미션 ID 오류")
  @Response<ApiErrorResponse>(StatusCodes.NOT_FOUND, "도전 중인 미션 없음")
  @Response<ApiErrorResponse>(StatusCodes.CONFLICT, "이미 완료한 미션")
  @Patch("missions/{userMissionId}/complete")
  public async completeMission(
    @Path() userMissionId: number
  ): Promise<ApiSuccessResponse<UserMissionResponse | null>> {
    const mission = await completeMissionService(userMissionId);

    return successResponse("COMMON200", mission, "미션 완료 처리에 성공했습니다.");
  }
}
