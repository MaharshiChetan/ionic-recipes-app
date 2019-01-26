import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  tab1: string = 'ShoppingListPage';
  tab2: string = 'RecipesPage';

  constructor() {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
