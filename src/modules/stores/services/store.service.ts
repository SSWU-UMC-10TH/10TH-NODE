// store.service.ts
import { addStore, addReview, addMission, addUserMission } from "../repositories/store.repository.js";
import { responseFromStore, responseFromReview, responseFromMission, responseFromUserMission } from "../dtos/store.dto.js";

export const createStore = async (data: any, regionId: number) => {
  const storeData = { ...data, regionId };
  const store = await addStore(storeData);
  return responseFromStore(store, regionId);
};

export const createReview = async (data: any, storeId: number) => {
  const review = await addReview(data);
  return responseFromReview(review, storeId);
};

export const createMission = async (data: any, storeId: number) => {
  const mission = await addMission(data);
  return responseFromMission(mission, storeId);
};

export const createUserMission = async (data: any) => {
  const userMission = await addUserMission(data);
  return responseFromUserMission(userMission);
};