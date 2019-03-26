import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";


/**
 * Generated class for the ManageUsersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-users',
  templateUrl: 'manage-users.html',
})
export class ManageUsersPage {

  users_data: any = [];
  private loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageUsersPage');

    let data = [];

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.dbapi.getListOf("users")
      .then((snapshot) => {
        for (let k in snapshot) {
          data.push({
            id: k,
            name: snapshot[k].name,
            email: snapshot[k].email
          })
        }
        this.users_data = data;
      })
      .then(() => this.loading.dismiss());
  }

  ionViewWillEnter() {

  }

}
