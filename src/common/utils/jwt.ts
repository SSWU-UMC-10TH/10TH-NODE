import jwt, { SignOptions } from "jsonwebtoken";

type TokenType = "access" | "refresh";

export interface JwtPayload {
  userId: number;
  email: string;
  type: TokenType;
}

const getRequiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} 환경 변수가 필요합니다.`);
  }

  return value;
};

const accessSecret = () => getRequiredEnv("JWT_ACCESS_SECRET");
const refreshSecret = () => getRequiredEnv("JWT_REFRESH_SECRET");

const signToken = (
  user: { id: number; email: string },
  type: TokenType,
  secret: string,
  expiresIn: SignOptions["expiresIn"]
) =>
  jwt.sign(
    {
      userId: user.id,
      email: user.email,
      type,
    },
    secret,
    { expiresIn }
  );

const verifyToken = (token: string, secret: string, type: TokenType) => {
  const payload = jwt.verify(token, secret) as JwtPayload;

  if (payload.type !== type) {
    throw new Error("Invalid token type");
  }

  return payload;
};

export const createAccessToken = (user: { id: number; email: string }) =>
  signToken(user, "access", accessSecret(), "1h");

export const createRefreshToken = (user: { id: number; email: string }) =>
  signToken(user, "refresh", refreshSecret(), "14d");

export const verifyAccessToken = (token: string) =>
  verifyToken(token, accessSecret(), "access");

export const verifyRefreshToken = (token: string) =>
  verifyToken(token, refreshSecret(), "refresh");

export const createTokenPair = (user: { id: number; email: string }) => ({
  accessToken: createAccessToken(user),
  refreshToken: createRefreshToken(user),
});
