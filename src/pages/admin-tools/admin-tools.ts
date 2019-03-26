import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ManageUsersPage} from "../manage-users/manage-users";
import {ManageStockPage} from "../manage-stock/manage-stock";

/**
 * Generated class for the AdminToolsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-tools',
  templateUrl: 'admin-tools.html',
})
export class AdminToolsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminToolsPage');
  }

  manageUsers() {
    this.navCtrl.push(ManageUsersPage);
  }

  manageStock() {
    this.navCtrl.push(ManageStockPage);
  }
}
