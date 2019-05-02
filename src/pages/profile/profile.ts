import { Component } from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { DbApiService } from "../../shared/db-api.service";
import { AuthProvider } from "../../providers/auth/auth";
import {ManageProfilePage} from '../manage-profile/manage-profile';
import * as _ from 'lodash';

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
  private iAm: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public authProvider: AuthProvider,
              public dbapi: DbApiService,
              public app: App,
              private events: Events) {
    this.user = navParams.data;
    this.iAm = _.size(this.user) == 0;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  ionViewWillEnter() {
    if (this.iAm) {
      this.user = AuthProvider.currentUser;
    }

    console.log('ionViewDidLoad ProfilePage');
  }

  modifyProfile(user){
    this.navCtrl.push(ManageProfilePage,user);
  }

  signOut() {
    this.authProvider.logoutUser();
  }

}


