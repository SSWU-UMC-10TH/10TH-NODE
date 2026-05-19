export const successResponse = <T>(result: T, message = "요청에 성공했습니다.") => {
  return {
    isSuccess: true,
    code: "COMMON200",
    message,
    result,
  };
};

export const errorResponse = (
  code: string,
  message: string,
  result: unknown = null
) => {
  return {
    isSuccess: false,
    code,
    message,
    result,
  };
};
