import { Injectable } from '@angular/core';
import { ShoppingListModel } from '../../models/shopping-list.model';

@Injectable({
  providedIn: 'root'
})
export class ListDataDefaultService {

  //Values for forms
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


  getItems(): string[]{
    return this.items;
  }


}
