import { Injectable } from '@angular/core';
import { ShoppingListModel } from '../../models/shopping-list.model';
import { StoreModel } from '../../models/store.model';

@Injectable({
  providedIn: 'root'
})
export class ListDataDefaultService {

  //Values for forms
  public stores: StoreModel[] = [
    {
      "storeName": "Walmart",
      "storeLocationStreet": "123 Main St",
      "storeLocationTown": "Springfield",
      "storeLocationState": "IL",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/200px-Walmart_logo.svg.png",
      "storeGUID": "b20cf45d-1d4a-4b78-9237-e8d1b6e8d1c3"
    },
    {
      "storeName": "Target",
      "storeLocationStreet": "456 Elm St",
      "storeLocationTown": "Columbus",
      "storeLocationState": "OH",
      "storeLogo": "https://corporate.target.com/getmedia/0289d38f-1bb0-48f9-b883-cd05e19b8f98/Target_Bullseye-Logo_Red_transparent.png",
      "storeGUID": "f839d7a1-a26d-4c37-8db9-8823eac9cde4"
    },
    {
      "storeName": "Costco",
      "storeLocationStreet": "789 Maple Ave",
      "storeLocationTown": "Madison",
      "storeLocationState": "WI",
      "storeLogo": "https://cdn.bfldr.com/56O3HXZ9/at/wkgcrwxgt5bt39wg63kgmqr/Costco-Logo-Registered.png?auto=webp&format=jpg",
      "storeGUID": "ad58f19c-cdf9-4bb6-b182-7146df8d4fb7"
    },
    {
      "storeName": "Home Depot",
      "storeLocationStreet": "303 Birch Rd",
      "storeLocationTown": "Seattle",
      "storeLocationState": "WA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/200px-TheHomeDepot.svg.png",
      "storeGUID": "f789b0ae-bc15-4a9d-b87d-4765311f84f5"
    }
  ]


  public items: string[] = [
    "Apples",
    "Bananas",
    "Carrots",
    "Milk",
    "Eggs",
    "Bread",
    "Cheese",
    "Chicken",
    "Rice",
    "Pasta",
    "Tomatoes",
    "Potatoes",
    "Onions",
    "Lettuce",
    "Cereal",
    "Yogurt",
    "Butter",
    "Coffee",
    "Tea",
    "Sugar",
    "Salt",
    "Pepper",
    "Flour",
    "Olive Oil",
    "Canned Beans",
    "Canned Tomatoes",
    "Frozen Peas",
    "Frozen Pizza",
    "Ice Cream",
    "Snack Bars",
    "Chips",
    "Cookies",
    "Juice",
    "Soda",
    "Toilet Paper",
    "Paper Towels",
    "Dish Soap",
    "Laundry Detergent"
  ]


  constructor() { }


  getItems(): StoreModel[]{
    return this.stores;
  }


}
