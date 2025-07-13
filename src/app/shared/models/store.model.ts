import { StoreItemModel } from "./store-item.model";

export interface StoreModel {
  storeName: string,
  storeLocationStreet: string,
  storeLocationTown: string,
  storeLocationState: string,
  storeLogo: string,
  storeGUID: string,
  storeItems: StoreItemModel[],
  storeAisleOrder: string[]
}
