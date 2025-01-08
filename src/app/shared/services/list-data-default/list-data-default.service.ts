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
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Target_logo.svg/200px-Target_logo.svg.png",
      "storeGUID": "f839d7a1-a26d-4c37-8db9-8823eac9cde4"
    },
    {
      "storeName": "Costco",
      "storeLocationStreet": "789 Maple Ave",
      "storeLocationTown": "Madison",
      "storeLocationState": "WI",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Costco_Wholesale_logo.svg/200px-Costco_Wholesale_logo.svg.png",
      "storeGUID": "ad58f19c-cdf9-4bb6-b182-7146df8d4fb7"
    },
    {
      "storeName": "Best Buy",
      "storeLocationStreet": "101 Oak St",
      "storeLocationTown": "Denver",
      "storeLocationState": "CO",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Best_Buy_logo_2018.svg/200px-Best_Buy_logo_2018.svg.png",
      "storeGUID": "d123ec08-f74d-4876-bb29-9a3b2a65a5f2"
    },
    {
      "storeName": "Kroger",
      "storeLocationStreet": "202 Pine Ln",
      "storeLocationTown": "Atlanta",
      "storeLocationState": "GA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Kroger_logo_%282019%29.svg/200px-Kroger_logo_%282019%29.svg.png",
      "storeGUID": "b563c103-5fa5-4b3d-834e-cd75252e9cf4"
    },
    {
      "storeName": "Home Depot",
      "storeLocationStreet": "303 Birch Rd",
      "storeLocationTown": "Seattle",
      "storeLocationState": "WA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/200px-TheHomeDepot.svg.png",
      "storeGUID": "f789b0ae-bc15-4a9d-b87d-4765311f84f5"
    },
    {
      "storeName": "Walgreens",
      "storeLocationStreet": "404 Cedar Blvd",
      "storeLocationTown": "Austin",
      "storeLocationState": "TX",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Walgreens_Logo.svg/200px-Walgreens_Logo.svg.png",
      "storeGUID": "e5a9c462-68bb-4e06-a4c4-42350f9a4928"
    },
    {
      "storeName": "CVS Pharmacy",
      "storeLocationStreet": "505 Spruce Dr",
      "storeLocationTown": "Boston",
      "storeLocationState": "MA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/CVS_Pharmacy_Logo.svg/200px-CVS_Pharmacy_Logo.svg.png",
      "storeGUID": "2e5ab52d-dca2-462b-9c14-74c9b9be53c2"
    },
    {
      "storeName": "Trader Joe's",
      "storeLocationStreet": "606 Palm St",
      "storeLocationTown": "San Diego",
      "storeLocationState": "CA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Trader_Joe%27s_logo.svg/200px-Trader_Joe%27s_logo.svg.png",
      "storeGUID": "f1dc6e21-086b-4f26-994f-4d2fa5a9ab4e"
    },
    {
      "storeName": "Whole Foods Market",
      "storeLocationStreet": "707 Redwood Ct",
      "storeLocationTown": "Portland",
      "storeLocationState": "OR",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/Whole_Foods_Market_logo.svg/200px-Whole_Foods_Market_logo.svg.png",
      "storeGUID": "bf0ea3d4-5c9e-40e4-a612-73529f3b5ad3"
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
