// 1. 회원가입 요청 데이터의 설계도를 만듭니다.
export interface UserSignUpRequest {
  /** 로그인에 사용할 이메일 */
  email: string;
  /** 로그인 비밀번호 */
  password: string;
  /** 회원 이름 */
  name: string;
  /** 회원 성별 */
  gender: string;
  /** 생년월일 */
  birth: string;
  address?: string;       // ?가 붙으면 '없을 수도 있음(선택)'이라는 뜻이에요!
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

// 2. 요청받은 데이터를 우리 시스템에 맞는 데이터로 변환해주는 함수입니다. 
export const bodyToUser = (body: UserSignUpRequest) => {
  const birth = new Date(body.birth); //날짜 변환

  return {
    email: body.email, //필수 
    password: body.password,
    name: body.name, // 필수
    gender: body.gender, // 필수
    birth, // 필수
    address: body.address || "", //선택 
    detailAddress: body.detailAddress || "", //선택 
    phoneNumber: body.phoneNumber,//필수
    preferences: body.preferences,// 필수 
  };
};

export const responseFromUser = ({ user, preferences }: any): UserSignUpResponse => {
  return {
    email: user.email,
    name: user.name,
    // 피드백 반영 수정: Prisma include 결과 구조에 맞춰 선호 카테고리명을 반환합니다.
    preferCategory: preferences.map((p: any) => p.foodCategory.name),
  };
};
