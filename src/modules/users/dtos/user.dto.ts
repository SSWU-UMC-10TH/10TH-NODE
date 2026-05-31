export interface UserSignUpRequest {
  /** 로그인에 사용할 이메일 */
  email: string;
  /** 로그인에 사용할 비밀번호 */
  password: string;
  /** 회원 이름 */
  name: string;
  /** 회원 성별 */
  gender: string;
  /** 생년월일 */
  birth: string;
  /** 주소 */
  address?: string;
  /** 상세 주소 */
  detailAddress?: string;
  /** 연락처 */
  phoneNumber: string;
  /** 선호 음식 카테고리 ID 목록 */
  preferences: number[];
}

export interface UserSignUpResponse {
  /** 가입한 회원 이메일 */
  email: string;
  /** 가입한 회원 이름 */
  name: string;
  /** 선호 음식 카테고리 이름 목록 */
  preferCategory: string[];
}

export interface UserLoginRequest {
  /** 로그인에 사용할 이메일 */
  email: string;
  /** 로그인에 사용할 비밀번호 */
  password: string;
}

export interface TokenResponse {
  /** API 요청에 사용할 Access Token */
  accessToken: string;
  /** Access Token 재발급에 사용할 Refresh Token */
  refreshToken: string;
}

export interface RefreshTokenRequest {
  /** 로그인 시 발급받은 Refresh Token */
  refreshToken: string;
}

export interface UserProfileUpdateRequest {
  /** 회원 이름 */
  name?: string;
  /** 회원 성별 */
  gender?: string;
  /** 생년월일 */
  birth?: string;
  /** 주소 */
  address?: string;
  /** 상세 주소 */
  detailAddress?: string;
  /** 연락처 */
  phoneNumber?: string;
  /** 선호 음식 카테고리 ID 목록 */
  preferences?: number[];
}

export interface UserProfileResponse {
  id: number;
  email: string;
  name: string;
  gender: string;
  birth: Date;
  address: string;
  detailAddress: string | null;
  phoneNumber: string;
  preferCategory: string[];
}

export const bodyToUser = (body: UserSignUpRequest) => {
  return {
    email: body.email,
    password: body.password,
    name: body.name,
    gender: body.gender,
    birth: new Date(body.birth),
    address: body.address || "",
    detailAddress: body.detailAddress || "",
    phoneNumber: body.phoneNumber,
    preferences: body.preferences,
  };
};

export const responseFromUser = ({ user, preferences }: any): UserSignUpResponse => {
  return {
    email: user.email,
    name: user.name,
    preferCategory: preferences.map((p: any) => p.foodCategory.name),
  };
};

export const profileFromUser = ({ user, preferences }: any): UserProfileResponse => {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    gender: user.gender,
    birth: user.birth,
    address: user.address,
    detailAddress: user.detailAddress,
    phoneNumber: user.phoneNumber,
    preferCategory: preferences.map((p: any) => p.foodCategory.name),
  };
};
