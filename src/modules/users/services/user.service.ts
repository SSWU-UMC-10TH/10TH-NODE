import { UserSignUpRequest } from "../dtos/user.dto.js"; //인터페이스 가져오기 
import { responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: any) => {
  const joinUserId = await addUser({
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth), // 문자열을 Date 객체로 변환해서 넘겨줍니다. 
    address: data.address,
    detailAddress: data.detailAddress,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throw new Error("이미 존재하는 이메일입니다.");
  }

  for (const preference of data.preferences) {
    await setPreference(joinUserId, preference);
  }

  const user = await getUser(joinUserId);
  const preferences = await getUserPreferencesByUserId(joinUserId);

  return responseFromUser({ user, preferences });
};

import bcrypt from 'bcrypt'; // 해싱 라이브러리

export const signUpService = async (userData: any) => {
    // 1. 비밀번호 해싱 (비밀번호를 암호화된 문자열로 변환)
    const saltRounds = 10; // 해싱 강도
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // 2. 원래 비밀번호를 암호화된 비밀번호로 교체
    const userDataToSave = {
        ...userData,
        password: hashedPassword
    };

    // 3. 해싱된 비밀번호가 담긴 데이터를 레포지토리로 전송
    return await addUser(userDataToSave);
};

// 내가 작성한 리뷰 목록

import { getUserReviews } from "../repositories/user.repository.js";
import { responseFromUserReviews, UserReviewResponse } from "../dtos/user.dto.js";

export const listUserReviews = async (userId: number, cursor: number): Promise<UserReviewResponse> => {
  // 1. 레포지토리 호출
  const reviews = await getUserReviews(userId, cursor);
  
  // 2. DTO 함수로 가공해서 반환
  return responseFromUserReviews(reviews);
};

import { getOngoingMissionsByUserId } from "../repositories/user.repository.js";
import { responseFromOngoingMissions } from "../dtos/user.dto.js";

export const getUserOngoingMissions = async (userId: number, cursor: number | null, size: number) => {
    // 다음 페이지 판별을 위해 size + 1 개를 긁어옵니다.
    const userMissions = await getOngoingMissionsByUserId(userId, cursor, size + 1);
    return responseFromOngoingMissions(userMissions, size);
};

import { updateUserMissionStatus } from "../repositories/user.repository.js";
import { responseFromCompleteMission } from "../dtos/user.dto.js";

export const completeUserMission = async (userMissionId: number) => {
    // DB의 상태를 '진행완료'로 업데이트 명령
    await updateUserMissionStatus(userMissionId, '진행완료');
    return responseFromCompleteMission(userMissionId);
};