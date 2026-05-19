import { Request, Response } from "express";
import { Body, Controller, Path, Patch, Route, SuccessResponse, Tags } from "tsoa";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../../common/response.js";
import { ChallengeMissionRequest } from "../dtos/mission.dto.js";
import { challengeMission } from "../services/mission.service.js";

@Route("users/missions")
@Tags("Mission")
export class MissionController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "미션 도전 성공")
  @Patch("{missionId}")
  public async challenge(
    @Path() missionId: number,
    @Body() data: ChallengeMissionRequest
  ) {
    await challengeMission(missionId, data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse(null, "미션 도전에 성공했습니다.");
  }
}

export const handleChallengeMission = async (req: Request, res: Response) => {
  const missionId = Number(req.params.missionId);
  const result = await new MissionController().challenge(missionId, req.body);

  res.status(StatusCodes.CREATED).json(result);
};
