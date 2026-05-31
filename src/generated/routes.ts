/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UserController } from './../modules/users/controllers/user.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { StoreController } from './../modules/stores/controllers/store.controller.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MissionController } from './../modules/missions/controllers/mission.controller.js';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UserSignUpResponse": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "preferCategory": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_UserSignUpResponse_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"ref":"UserSignUpResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiErrorResponse": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[false],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"enum","enums":[null],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserSignUpRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "gender": {"dataType":"string","required":true},
            "birth": {"dataType":"string","required":true},
            "address": {"dataType":"string"},
            "detailAddress": {"dataType":"string"},
            "phoneNumber": {"dataType":"string","required":true},
            "preferences": {"dataType":"array","array":{"dataType":"double"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TokenResponse": {
        "dataType": "refObject",
        "properties": {
            "accessToken": {"dataType":"string","required":true},
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_TokenResponse_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"ref":"TokenResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserLoginRequest": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "password": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RefreshTokenRequest": {
        "dataType": "refObject",
        "properties": {
            "refreshToken": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserProfileResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "email": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "gender": {"dataType":"string","required":true},
            "birth": {"dataType":"datetime","required":true},
            "address": {"dataType":"string","required":true},
            "detailAddress": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "phoneNumber": {"dataType":"string","required":true},
            "preferCategory": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_UserProfileResponse_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"ref":"UserProfileResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserProfileUpdateRequest": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "gender": {"dataType":"string"},
            "birth": {"dataType":"string"},
            "address": {"dataType":"string"},
            "detailAddress": {"dataType":"string"},
            "phoneNumber": {"dataType":"string"},
            "preferences": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_null_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"enum","enums":[null],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddReviewRequest": {
        "dataType": "refObject",
        "properties": {
            "rating": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AddMissionRequest": {
        "dataType": "refObject",
        "properties": {
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "rewardPoint": {"dataType":"double","required":true},
            "deadline": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreSummary": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "name": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "rating": {"dataType":"double","required":true},
            "content": {"dataType":"string","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
            "store": {"ref":"StoreSummary","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReviewListResponse": {
        "dataType": "refObject",
        "properties": {
            "data": {"dataType":"array","array":{"dataType":"refObject","ref":"ReviewResponse"},"required":true},
            "pagination": {"dataType":"nestedObjectLiteral","nestedProperties":{"cursor":{"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"enum","enums":[null]}],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_ReviewListResponse_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"ref":"ReviewListResponse","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StoreMissionResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "storeId": {"dataType":"double","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "rewardPoint": {"dataType":"double","required":true},
            "deadline": {"dataType":"datetime","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_StoreMissionResponse-Array_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"array","array":{"dataType":"refObject","ref":"StoreMissionResponse"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UserMissionResponse": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"double","required":true},
            "userId": {"dataType":"double","required":true},
            "missionId": {"dataType":"double","required":true},
            "status": {"dataType":"string","required":true},
            "completedAt": {"dataType":"union","subSchemas":[{"dataType":"datetime"},{"dataType":"enum","enums":[null]}],"required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiSuccessResponse_UserMissionResponse-or-null_": {
        "dataType": "refObject",
        "properties": {
            "isSuccess": {"dataType":"enum","enums":[true],"required":true},
            "code": {"dataType":"string","required":true},
            "message": {"dataType":"string","required":true},
            "result": {"dataType":"union","subSchemas":[{"ref":"UserMissionResponse"},{"dataType":"enum","enums":[null]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsUserController_signUp: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"UserSignUpRequest"},
        };
        app.post('/users/signup',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.signUp)),

            async function UserController_signUp(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_signUp, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'signUp',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_login: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"UserLoginRequest"},
        };
        app.post('/users/login',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.login)),

            async function UserController_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_login, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_refresh: Record<string, TsoaRoute.ParameterSchema> = {
                data: {"in":"body","name":"data","required":true,"ref":"RefreshTokenRequest"},
        };
        app.post('/users/refresh',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.refresh)),

            async function UserController_refresh(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_refresh, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'refresh',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_getMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.get('/users/me',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.getMe)),

            async function UserController_getMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_getMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'getMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsUserController_updateMe: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                data: {"in":"body","name":"data","required":true,"ref":"UserProfileUpdateRequest"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.patch('/users/me',
            ...(fetchMiddlewares<RequestHandler>(UserController)),
            ...(fetchMiddlewares<RequestHandler>(UserController.prototype.updateMe)),

            async function UserController_updateMe(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsUserController_updateMe, request, response });

                const controller = new UserController();

              await templateService.apiHandler({
                methodName: 'updateMe',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_addReview: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"AddReviewRequest"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.post('/stores/:storeId/reviews',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.addReview)),

            async function StoreController_addReview(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_addReview, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'addReview',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_addMission: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
                data: {"in":"body","name":"data","required":true,"ref":"AddMissionRequest"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.post('/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.addMission)),

            async function StoreController_addMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_addMission, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'addMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_getMyReviews: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                cursor: {"in":"query","name":"cursor","dataType":"double"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.get('/reviews/my',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.getMyReviews)),

            async function StoreController_getMyReviews(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_getMyReviews, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'getMyReviews',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_getStoreMissions: Record<string, TsoaRoute.ParameterSchema> = {
                storeId: {"in":"path","name":"storeId","required":true,"dataType":"double"},
        };
        app.get('/stores/:storeId/missions',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.getStoreMissions)),

            async function StoreController_getStoreMissions(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_getStoreMissions, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'getStoreMissions',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsStoreController_completeMission: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                userMissionId: {"in":"path","name":"userMissionId","required":true,"dataType":"double"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.patch('/missions/:userMissionId/complete',
            ...(fetchMiddlewares<RequestHandler>(StoreController)),
            ...(fetchMiddlewares<RequestHandler>(StoreController.prototype.completeMission)),

            async function StoreController_completeMission(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsStoreController_completeMission, request, response });

                const controller = new StoreController();

              await templateService.apiHandler({
                methodName: 'completeMission',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMissionController_challenge: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                missionId: {"in":"path","name":"missionId","required":true,"dataType":"double"},
                _authorization: {"in":"header","name":"Authorization","dataType":"string"},
        };
        app.patch('/users/missions/:missionId',
            ...(fetchMiddlewares<RequestHandler>(MissionController)),
            ...(fetchMiddlewares<RequestHandler>(MissionController.prototype.challenge)),

            async function MissionController_challenge(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMissionController_challenge, request, response });

                const controller = new MissionController();

              await templateService.apiHandler({
                methodName: 'challenge',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
