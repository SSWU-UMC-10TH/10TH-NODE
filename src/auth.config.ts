import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import { createTokenPair } from "./common/utils/jwt.js";
import { getOrCreateGoogleUser } from "./modules/users/repositories/user.repository.js";

const getGoogleUser = async (profile: Profile) => {
  const email = profile.emails?.[0]?.value;

  if (!email) {
    throw new Error("Google 계정에서 이메일을 가져올 수 없습니다.");
  }

  return await getOrCreateGoogleUser({
    email,
    name: profile.displayName || email.split("@")[0] || "Google User",
  });
};

export const configurePassport = () => {
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

  if (!clientID || !clientSecret) {
    console.warn(
      "[auth] GOOGLE_CLIENT_ID 또는 GOOGLE_CLIENT_SECRET이 없어 Google 로그인을 비활성화합니다."
    );
    return false;
  }

  passport.use(
    new GoogleStrategy(
      {
        clientID,
        clientSecret,
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "http://localhost:3000/api/v1/auth/google/callback",
        scope: ["profile", "email"],
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          const user = await getGoogleUser(profile);
          done(null, {
            user: {
              id: user.id,
              email: user.email,
              name: user.name,
            },
            tokens: createTokenPair(user),
          });
        } catch (error) {
          done(error as Error);
        }
      }
    )
  );

  return true;
};
