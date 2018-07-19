import { Ingredient } from '../models/ingredient';
import { Http, Response } from '@angular/http';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Component } from '@angular/core';

@Component({})
export class ShoppingListService {
  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService) {}

  addItem(name: string, amount: number) {
    this.ingredients.push(new Ingredient(name, amount));
    console.log(this.ingredients);
  }

  addItems(items: Ingredient[]) {
    this.ingredients.push(...items);
  }

  getItems() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put(
        'https://fir-crud-a5c1a.firebaseio.com/' +
          userId +
          '/shopping-list.json?auth=' +
          token,
        this.ingredients
      )
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .get(
        'https://fir-crud-a5c1a.firebaseio.com/' +
          userId +
          '/shopping-list.json?auth=' +
          token
      )
      .map((response: Response) => {
        return response.json();
      })
      .do((ingredients: Ingredient[]) => {
        if (ingredients) {
          this.ingredients = ingredients;
        } else {
          this.ingredients = [];
        }
      });
  }
}
