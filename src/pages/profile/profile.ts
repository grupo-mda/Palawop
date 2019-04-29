import { Component } from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from "../login/login";
import {ManageStockPage} from '../manage-stock/manage-stock';
import {ManageProfilePage} from '../manage-profile/manage-profile';
import {ManageProfilePageModule} from '../manage-profile/manage-profile.module';

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
              public app: App,
              private events : Events
              ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    this.user = AuthProvider.currentUser;
    this.events.subscribe('newUserData', () => this.user = AuthProvider.currentUser)
  }

  ionViewWillLeave() {
    this.events.unsubscribe('newUserData');
  }

  modifyProfile(user){
    this.navCtrl.push(ManageProfilePage,user);
  }

  signOut() {
    this.authProvider.logoutUser()
      // .then(() =>
      //   this.app.getRootNav().setRoot(
      //   LoginPage,
      //   {},
      //   {
      //     animate: true,
      //     direction: 'back'
      //   }));
  }
}


