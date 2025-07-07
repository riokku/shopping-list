import { StoreItemModel } from "./store-item.model";

export interface ShoppingListItemModel {
  item: StoreItemModel,
  quantity: string,
  notes: string
}
