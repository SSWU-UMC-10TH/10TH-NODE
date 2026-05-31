import {
  Controller,
  Header,
  Path,
  Patch,
  Request,
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
import { challengeMission } from "../services/mission.service.js";

@Route("users/missions")
@Tags("Mission")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary Bearer Token으로 로그인한 사용자가 특정 미션에 도전합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "미션 도전 성공")
  @Response<ApiErrorResponse>(StatusCodes.UNAUTHORIZED, "로그인 필요")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "미션 ID 오류")
  @Response<ApiErrorResponse>(StatusCodes.NOT_FOUND, "존재하지 않는 미션")
  @Response<ApiErrorResponse>(StatusCodes.CONFLICT, "이미 진행 중이거나 완료한 미션")
  @Patch("{missionId}")
  public async challenge(
    @Request() req: any,
    @Path() missionId: number,
    @Header("Authorization") _authorization?: string
  ): Promise<ApiSuccessResponse<null>> {
    await challengeMission(req.user!.id, missionId);

    this.setStatus(StatusCodes.CREATED);
    return successResponse("COMMON201", null, "미션 도전에 성공했습니다.");
  }
}
