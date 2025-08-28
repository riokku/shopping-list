import { Injectable } from '@angular/core';
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
      "storeLogo": "https://brandcenter.walmart.com/content/dam/brand/home/brand-identity/spark/Spark.svg",
      "storeGUID": "b20cf45d-1d4a-4b78-9237-e8d1b6e8d1c3",
      "storeItems": [
        {
          "name": "Milk",
          "aisle": "12"
        },
        {
          "name": "Eggs",
          "aisle": "6"
        },
        {
          "name": "Bread",
          "aisle": "10"
        },
        {
          "name": "Bananas",
          "aisle": "Produce"
        },
        {
          "name": "Chicken",
          "aisle": "Freezer Section"
        }
      ],
      "storeAisleOrder": [
        "Produce", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "Freezer Section"
      ]
    },
    {
      "storeName": "Target",
      "storeLocationStreet": "456 Elm St",
      "storeLocationTown": "Columbus",
      "storeLocationState": "OH",
      "storeLogo": "https://corporate.target.com/getmedia/0289d38f-1bb0-48f9-b883-cd05e19b8f98/Target_Bullseye-Logo_Red_transparent.png",
      "storeGUID": "f839d7a1-a26d-4c37-8db9-8823eac9cde4",
      "storeItems": [
        {
          "name": "Toilet Paper",
          "aisle": "3"
        },
        {
          "name": "Salmon",
          "aisle": "Freezer"
        },
        {
          "name": "Blueberries",
          "aisle": "Produce"
        },
        {
          "name": "Cheese",
          "aisle": 8
        },
        {
          "name": "Cereal",
          "aisle": 5
        }
      ],
      "storeAisleOrder": [
        "test"
      ]
    },
    {
      "storeName": "Costco",
      "storeLocationStreet": "789 Maple Ave",
      "storeLocationTown": "Madison",
      "storeLocationState": "WI",
      "storeLogo": "https://cdn.bfldr.com/56O3HXZ9/at/wkgcrwxgt5bt39wg63kgmqr/Costco-Logo-Registered.png?auto=webp&format=jpg",
      "storeGUID": "ad58f19c-cdf9-4bb6-b182-7146df8d4fb7",
      "storeItems": [
        {
          "name": "Shampoo",
          "aisle": "14"
        },
        {
          "name": "Conditioner",
          "aisle": "14"
        },
        {
          "name": "Towels",
          "aisle": 9
        },
        {
          "name": "Toothpaste",
          "aisle": "Personal Care"
        },
        {
          "name": "Coffee",
          "aisle": 7
        }
      ],
      "storeAisleOrder": [
        "test"
      ]
    },
    {
      "storeName": "Home Depot",
      "storeLocationStreet": "303 Birch Rd",
      "storeLocationTown": "Seattle",
      "storeLocationState": "WA",
      "storeLogo": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/TheHomeDepot.svg/200px-TheHomeDepot.svg.png",
      "storeGUID": "f789b0ae-bc15-4a9d-b87d-4765311f84f5",
      "storeItems": [
        {
          "name": "Almond Butter",
          "aisle": "Nuts & Spreads"
        },
        {
          "name": "Orange Juice",
          "aisle": "Refrigerated Drinks"
        },
        {
          "name": "Avocados",
          "aisle": "Produce"
        },
        {
          "name": "Chocolate",
          "aisle": "Sweets"
        },
        {
          "name": "Pasta",
          "aisle": 4
        }
      ],
      "storeAisleOrder": [
        "test"
      ]
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

  public aisles: string[] = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "Florist",
    "Produce",
    "Lunch meat",
    "Protein",
    "Dairy",
    "Bakery",
    "Deli",
    "Pre-made"
  ]

  constructor() { }

  getStores(): StoreModel[]{
    return this.stores;
  }

  getAisles(): string[]{
    return this.aisles;
  }

  async getStoreAisleOrder(store: any): Promise<string[]>{
    console.log(store);

    const selectedStore = this.stores.find(s => s.storeName.toLowerCase() === store.toLowerCase());
    return selectedStore?.storeAisleOrder ?? [];
  }

  getSpecificStore(incomingStoreGuid:string | undefined): StoreModel | undefined{
    return this.stores.find(store => store.storeGUID === incomingStoreGuid);
  }


}
