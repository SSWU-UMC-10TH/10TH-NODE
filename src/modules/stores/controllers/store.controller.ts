import { Request, Response } from "express";
import {
  Body,
  Controller,
  Get,
  Patch,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
  Tags,
} from "tsoa";
import { StatusCodes } from "http-status-codes";
import { successResponse } from "../../../common/response.js";
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
  responseFromReviews,
} from "../dtos/store.dto.js";

@Route("")
@Tags("Store")
export class StoreController extends Controller {
  @SuccessResponse(StatusCodes.CREATED, "리뷰 등록 성공")
  @Post("stores/{storeId}/reviews")
  public async addReview(
    @Path() storeId: number,
    @Body() data: AddReviewRequest
  ) {
    await createReview(storeId, data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse(null, "리뷰 등록에 성공했습니다.");
  }

  @SuccessResponse(StatusCodes.CREATED, "미션 등록 성공")
  @Post("stores/{storeId}/missions")
  public async addMission(
    @Path() storeId: number,
    @Body() data: AddMissionRequest
  ) {
    await createMission(storeId, data);

    this.setStatus(StatusCodes.CREATED);
    return successResponse(null, "미션 등록에 성공했습니다.");
  }

  @Get("reviews/my")
  public async getMyReviews(
    @Query() userId = 1,
    @Query() cursor?: number
  ) {
    const reviews = await getMyReviewsService(userId, cursor);

    return successResponse(responseFromReviews(reviews));
  }

  @Get("stores/{storeId}/missions")
  public async getStoreMissions(@Path() storeId: number) {
    const missions = await getMissionsByStoreService(storeId);

    return successResponse(missions);
  }

  @Patch("missions/{userMissionId}/complete")
  public async completeMission(@Path() userMissionId: number) {
    const mission = await completeMissionService(userMissionId);

    return successResponse(mission, "미션 완료 처리에 성공했습니다.");
  }
}

export const handleAddReview = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);
  const result = await new StoreController().addReview(storeId, req.body);

  res.status(StatusCodes.CREATED).json(result);
};

export const handleAddMission = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);
  const result = await new StoreController().addMission(storeId, req.body);

  res.status(StatusCodes.CREATED).json(result);
};

export const handleGetMyReviews = async (req: Request, res: Response) => {
  const userId = req.query.userId ? Number(req.query.userId) : 1;
  const cursor = req.query.cursor ? Number(req.query.cursor) : undefined;
  const result = await new StoreController().getMyReviews(userId, cursor);

  res.json(result);
};

export const handleGetStoreMissions = async (req: Request, res: Response) => {
  const storeId = Number(req.params.storeId);
  const result = await new StoreController().getStoreMissions(storeId);

  res.json(result);
};

export const handleCompleteMission = async (req: Request, res: Response) => {
  const userMissionId = Number(req.params.userMissionId);
  const result = await new StoreController().completeMission(userMissionId);

  res.json(result);
};
