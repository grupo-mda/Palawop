import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AdminToolsPage } from "../admin-tools/admin-tools";
import { ProfilePage } from "../profile/profile";
import { DbApiService } from "../../shared/db-api.service";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  homeTab    = HomePage;
  adminTab   = AdminToolsPage;
  profileTab = ProfilePage;
  isAdmin    = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbapi: DbApiService) {
    this.dbapi.getCurrentUser()
      .then((value) => this.isAdmin = value.admin);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
