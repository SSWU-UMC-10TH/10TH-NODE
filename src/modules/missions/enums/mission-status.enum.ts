// 피드백 반영 수정: 미션 상태값을 문자열 하드코딩 대신 공통 상수로 관리합니다.
export const MISSION_STATUS = {
  IN_PROGRESS: "IN_PROGRESS",
  COMPLETE: "COMPLETE",
} as const;

export type MissionStatus =
  (typeof MISSION_STATUS)[keyof typeof MISSION_STATUS];
