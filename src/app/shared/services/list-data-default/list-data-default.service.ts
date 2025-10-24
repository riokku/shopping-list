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
          "item_name": "Milk",
          "item_aisle": "12"
        },
        {
          "item_name": "Eggs",
          "item_aisle": "6"
        },
        {
          "item_name": "Bread",
          "item_aisle": "10"
        },
        {
          "item_name": "Bananas",
          "item_aisle": "Produce"
        },
        {
          "item_name": "Chicken",
          "item_aisle": "Freezer Section"
        }
      ],
      "storeAisleOrder": [
        "Produce", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "Freezer Section"
      ]
    }
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

  constructor() {}

  getStores(): StoreModel[]{
    return this.stores;
  }

  getAisles(): string[]{
    return this.aisles;
  }

  async getStoreAisleOrder(store: any): Promise<string[]>{
    console.log(store);

    const aisleOrder = this.aisles;
    return aisleOrder ?? [];
  }

  getSpecificStore(incomingStoreGuid:string | undefined): StoreModel | undefined{
    return this.stores.find(store => store.storeGUID === incomingStoreGuid);
  }


}
