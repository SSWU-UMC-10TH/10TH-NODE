export interface ApiSuccessResponse<T> {
  /** 요청 성공 여부 */
  isSuccess: true;
  /** 응답 코드 */
  code: string;
  /** 응답 메시지 */
  message: string;
  /** 응답 데이터 */
  result: T;
}

export interface ApiErrorResponse<T = null> {
  /** 요청 성공 여부 */
  isSuccess: false;
  /** 에러 코드 */
  code: string;
  /** 에러 메시지 */
  message: string;
  /** 에러 상세 데이터 */
  result: T;
}

// 피드백 반영: HTTP status와 별도로 응답 code를 호출부에서 명시합니다.
export const successResponse = <T>(
  code: string,
  result: T,
  message = "요청에 성공했습니다."
): ApiSuccessResponse<T> => {
  return {
    isSuccess: true,
    code,
    message,
    result,
  };
};

export const errorResponse = (
  code: string,
  message: string,
  result: unknown = null
): ApiErrorResponse<unknown> => {
  return {
    isSuccess: false,
    code,
    message,
    result,
  };
};
