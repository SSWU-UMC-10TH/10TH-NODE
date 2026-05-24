import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../../common/errors.js";
import { UserSignUpRequest, responseFromUser } from "../dtos/user.dto.js";
import {
  addUser,
  getUser,
  getUserPreferencesByUserId,
  setPreference,
} from "../repositories/user.repository.js";

export const userSignUp = async (data: UserSignUpRequest) => {
  if (
    !data.email ||
    !data.password ||
    !data.name ||
    !data.gender ||
    !data.birth ||
    !data.phoneNumber
  ) {
    throwError(
      StatusCodes.BAD_REQUEST,
      "USER400",
      "회원가입 필수 값이 누락되었습니다."
    );
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const joinUserId = await addUser({
    password: hashedPassword,
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address ?? "",
    detailAddress: data.detailAddress ?? null,
    phoneNumber: data.phoneNumber,
  });

  if (joinUserId === null) {
    throwError(StatusCodes.CONFLICT, "USER409", "이미 존재하는 이메일입니다.");
  }

  const userId = joinUserId as number;

  for (const preference of data.preferences ?? []) {
    await setPreference(userId, preference);
  }

  const user = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user, preferences });
};
