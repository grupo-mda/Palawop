import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams } from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from "../login/login";

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  private user: any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public dbapi: DbApiService,
              public app: App) {
    this.dbapi.getCurrentUser()
      .then((value) => this.user = value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  signOut() {
    this.authProvider.logoutUser()
      .then(() =>
        this.app.getRootNav().setRoot(
        LoginPage,
        {},
        {
          animate: true,
          direction: 'back'
        }));
  }
}


