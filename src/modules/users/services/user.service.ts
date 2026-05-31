import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
import { throwError } from "../../../common/errors.js";
import {
  createTokenPair,
  verifyRefreshToken,
} from "../../../common/utils/jwt.js";
import {
  RefreshTokenRequest,
  UserLoginRequest,
  UserProfileUpdateRequest,
  UserSignUpRequest,
  profileFromUser,
  responseFromUser,
} from "../dtos/user.dto.js";
import {
  addUser,
  clearPreferences,
  getUser,
  getUserByEmail,
  getUserPreferencesByUserId,
  setPreference,
  updateUser,
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
    throwError(StatusCodes.BAD_REQUEST, "USER400", "회원가입 필수 값이 누락되었습니다.");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userId = await addUser({
    password: hashedPassword,
    email: data.email,
    name: data.name,
    gender: data.gender,
    birth: new Date(data.birth),
    address: data.address ?? "",
    detailAddress: data.detailAddress ?? null,
    phoneNumber: data.phoneNumber,
  });

  await clearPreferences(userId);
  for (const preference of data.preferences ?? []) {
    await setPreference(userId, preference);
  }

  const user = await getUser(userId);
  const preferences = await getUserPreferencesByUserId(userId);

  return responseFromUser({ user, preferences });
};

export const userLogin = async (data: UserLoginRequest) => {
  if (!data.email || !data.password) {
    throwError(StatusCodes.BAD_REQUEST, "AUTH400", "이메일과 비밀번호가 필요합니다.");
  }

  const user = await getUserByEmail(data.email);

  if (!user || !user.password) {
    throwError(StatusCodes.UNAUTHORIZED, "AUTH401", "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  const loginUser = user!;
  const isPasswordValid = await bcrypt.compare(data.password, loginUser.password);

  if (!isPasswordValid) {
    throwError(StatusCodes.UNAUTHORIZED, "AUTH401", "이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  return createTokenPair(loginUser);
};

export const refreshAccessToken = async (data: RefreshTokenRequest) => {
  if (!data.refreshToken) {
    throwError(StatusCodes.BAD_REQUEST, "AUTH400", "Refresh Token이 필요합니다.");
  }

  try {
    const payload = verifyRefreshToken(data.refreshToken);
    const user = await getUser(payload.userId);

    if (!user) {
      throwError(StatusCodes.UNAUTHORIZED, "AUTH401", "유효하지 않은 토큰입니다.");
    }

    const tokenUser = user!;
    return createTokenPair(tokenUser);
  } catch {
    return throwError(StatusCodes.UNAUTHORIZED, "AUTH401", "유효하지 않은 토큰입니다.");
  }
};

export const getMyProfile = async (userId: number) => {
  const user = await getUser(userId);

  if (!user) {
    throwError(StatusCodes.NOT_FOUND, "USER404", "존재하지 않는 회원입니다.");
  }

  const preferences = await getUserPreferencesByUserId(userId);
  return profileFromUser({ user, preferences });
};

export const updateMyProfile = async (
  userId: number,
  data: UserProfileUpdateRequest
) => {
  const updateData: any = {};

  if (data.name !== undefined) updateData.name = data.name;
  if (data.gender !== undefined) updateData.gender = data.gender;
  if (data.birth !== undefined) updateData.birth = new Date(data.birth);
  if (data.address !== undefined) updateData.address = data.address;
  if (data.detailAddress !== undefined) updateData.detailAddress = data.detailAddress;
  if (data.phoneNumber !== undefined) updateData.phoneNumber = data.phoneNumber;

  await updateUser(userId, updateData);

  if (data.preferences !== undefined) {
    await clearPreferences(userId);
    for (const preference of data.preferences) {
      await setPreference(userId, preference);
    }
  }

  return await getMyProfile(userId);
};
