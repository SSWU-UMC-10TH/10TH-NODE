# Week 9 Common Mission

## Implemented

- `POST /api/v1/users/login`: email/password login and JWT issue
- `POST /api/v1/users/refresh`: refresh access token
- `GET /api/v1/auth/google`: start Google OAuth login
- `GET /api/v1/auth/google/callback`: Google OAuth callback and JWT issue
- `GET /api/v1/users/me`: get my profile with JWT
- `PATCH /api/v1/users/me`: update my profile with JWT
- `POST /api/v1/stores/{storeId}/reviews`: protected review creation
- `POST /api/v1/stores/{storeId}/missions`: protected mission creation
- `GET /api/v1/reviews/my`: uses JWT user id instead of query `userId`
- `PATCH /api/v1/users/missions/{missionId}`: uses JWT user id for mission challenge
- `PATCH /api/v1/missions/{userMissionId}/complete`: checks JWT user id before completing mission

## Postman Test Flow

1. Run the server.
2. Sign up or update a user with `POST /api/v1/users/signup`.
3. Login with `POST /api/v1/users/login`.
4. Copy `result.accessToken`.
5. Call protected APIs with this header:

```http
Authorization: Bearer {accessToken}
```

## Token Environment Variables

```env
JWT_ACCESS_SECRET="your-access-secret"
JWT_REFRESH_SECRET="your-refresh-secret"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GOOGLE_CALLBACK_URL="http://localhost:3000/api/v1/auth/google/callback"
```

Google Cloud Console Redirect URI:

```text
http://localhost:3000/api/v1/auth/google/callback
```
