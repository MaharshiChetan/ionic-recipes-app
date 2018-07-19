import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-sl-options',
  template: `
    <ion-grid text-center>
      <ion-row>
        <ion-col>
          <h3>Store and Load</h3>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline block (click)="onAction('load')">Load List</button>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          <button ion-button outline block (click)="onAction('store')">Save List</button>
        </ion-col>
      </ion-row>
    </ion-grid>
  `,
})
export class DatabaseOptionsPage {
  constructor(private viewCtrl: ViewController) {}

  onAction(action: string) {
    this.viewCtrl.dismiss({ action: action || '' });
  }
}
