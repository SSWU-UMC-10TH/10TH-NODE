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

  return responseFromUser( user, preferences );
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