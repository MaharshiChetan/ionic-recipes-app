import { Component } from '@angular/core';
import {
  IonicPage,
  PopoverController,
  LoadingController,
  AlertController,
} from 'ionic-angular';
import { NgForm } from '../../../node_modules/@angular/forms';
import { ShoppingListService } from '../../services/shopping-list.service';
import { Ingredient } from '../../models/ingredient';
import { AuthService } from '../../services/auth.service';
import { DatabaseOptionsPage } from '../database-options/database-options';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {
  listItems: Ingredient[];

  constructor(
    private slService: ShoppingListService,
    private popoverCtrl: PopoverController,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ionViewWillEnter() {
    this.loadItems();
  }

  onAddItem(form: NgForm) {
    this.slService.addItem(form.value.ingredientName, form.value.amount);
    form.reset();
    this.loadItems();
  }

  loadItems() {
    this.listItems = this.slService.getItems();
  }

  onCheckItem(index: number) {
    this.slService.removeItem(index);
    this.loadItems();
  }

  onShowOptions(event: MouseEvent) {
    const loading = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    const popover = this.popoverCtrl.create(DatabaseOptionsPage);
    popover.present({ ev: event });
    popover.onDidDismiss(data => {
      if (data != null) {
        if (data.action == 'load') {
          loading.present();
          this.authService
            .getActiveUser()
            .getIdToken()
            .then((token: string) => {
              this.slService.fetchList(token).subscribe(
                (list: Ingredient[]) => {
                  loading.dismiss();
                  if (list) {
                    this.listItems = list;
                  } else {
                    this.listItems = [];
                  }
                },
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                }
              );
            });
        } else if (data.action == 'store') {
          loading.present();
          this.authService
            .getActiveUser()
            .getIdToken()
            .then((token: string) => {
              this.slService.storeList(token).subscribe(
                () => loading.dismiss(),
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                }
              );
            });
        } else {
          return;
        }
      }
    });
  }

  handleError(errorMessage: string) {
    const alert = this.alertCtrl.create({
      title: 'An error occurred!',
      message: errorMessage,
      buttons: ['Ok'],
    });
    alert.present();
  }
}
