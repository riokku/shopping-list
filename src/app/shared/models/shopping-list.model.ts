import { ShoppingListItemModel } from "./shopping-list-item.model";

export interface ShoppingListModel {
  storeName: string,
  items: ShoppingListItemModel[]
}
