import {
  Body,
  Controller,
  Path,
  Patch,
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
import { ChallengeMissionRequest } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

@Route("users/missions")
@Tags("Mission")
export class MissionController extends Controller {
  /**
   * 미션 도전 API
   * @summary 회원이 특정 미션에 도전합니다.
   */
  @SuccessResponse(StatusCodes.CREATED, "미션 도전 성공")
  @Response<ApiErrorResponse>(StatusCodes.BAD_REQUEST, "미션 또는 회원 ID 오류")
  @Response<ApiErrorResponse>(StatusCodes.NOT_FOUND, "존재하지 않는 미션")
  @Response<ApiErrorResponse>(StatusCodes.CONFLICT, "이미 도전 중이거나 완료한 미션")
  @Patch("{missionId}")
  public async challenge(
    @Path() missionId: number,
    @Body() data: ChallengeMissionRequest
  ): Promise<ApiSuccessResponse<null>> {
    await challengeMission(missionId, data);

    this.setStatus(StatusCodes.CREATED);
    // 피드백 반영: result가 null인 생성 응답도 명세 타입과 응답 코드로 드러냅니다.
    return successResponse("COMMON201", null, "미션 도전에 성공했습니다.");
  }
}
