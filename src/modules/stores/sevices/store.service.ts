import { addStore } from "../repositories/store.repository.js";
import { responseFromStore } from "../dtos/store.dto.js";

export const createStore = async (data: any, regionId: number) => {
  const storeData = { ...data, regionId };
  const store = await addStore(storeData);
  return responseFromStore(store, regionId);
};