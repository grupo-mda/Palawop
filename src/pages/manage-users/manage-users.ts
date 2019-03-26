import { Component } from '@angular/core';
import { AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import {ManageProfilePage} from "../manage-profile/manage-profile";


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
              public dbapi: DbApiService,
              public alertCtrl: AlertController) {
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

  editItem(item: any) {
    this.navCtrl.push(ManageProfilePage, item);
  }

  itemDelete(user_data: any) {
    const confirm = this.alertCtrl.create({
      title: 'r u sure?',
      message: 'This is 4eva',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.users_data.splice(this.users_data.findIndex(
              (userId) => {return userId.id == user_data.id }
              ),1
            );
            this.dbapi.deleteUser(user_data);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }
}
