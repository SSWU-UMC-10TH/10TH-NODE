import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { bodyToUser, UserSignUpRequest} from "../dtos/user.dto.js";
import { userSignUp } from "../services/user.service.js";

export const handleUserSignUp = async (req: Request, res: Response, next: NextFunction ) => {
  console.log("회원가입을 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
 
	//서비스 로직 호출 
  const user = await userSignUp(bodyToUser(req.body as UserSignUpRequest));
  
  //성공 응답 보내기
  res.status(StatusCodes.OK).json({ result: user });
};

// 내가 작성한 리뷰 목록

import { listUserReviews } from "../services/user.service.js";

export const handleListUserReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = parseInt(req.params.userId as string, 10);
    const cursor = typeof req.query.cursor === "string" ? parseInt(req.query.cursor, 10) : 0;

    // 서비스 호출
    const response = await listUserReviews(userId, cursor);

    // 성공 응답 전송
    res.status(StatusCodes.OK).json(response);
  } catch (err) {
    next(err);
  }
};

import { getUserOngoingMissions } from "../services/user.service.js";

export const handleUserOngoingMissionsGet = async (req: Request, res: Response, next: any) => {
    try {
        const userId = parseInt(req.params.userId as string);
        const cursor = req.query.cursor ? parseInt(req.query.cursor as string) : null;
        const size = req.query.size ? parseInt(req.query.size as string) : 10;

        const result = await getUserOngoingMissions(userId, cursor, size);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};

import { completeUserMission } from "../services/user.service.js";

export const handleUserMissionCompletePatch = async (req: Request, res: Response, next: any) => {
    try {
        const userMissionId = parseInt(req.params.userMissionId as string);

        const result = await completeUserMission(userMissionId);
        res.status(200).json({ success: true, data: result });
    } catch (error) {
        next(error);
    }
};