import { Request, Response } from "express";
import { challengeMission } from "../services/mission.service.js";

export const handleChallengeMission = async (req: Request, res: Response) => {
  const missionId = Number(req.params.missionId);

  await challengeMission(missionId, req.body);

  res.status(200).json({
    message: "미션 도전 완료",
  });
};