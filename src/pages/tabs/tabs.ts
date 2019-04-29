import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from "../home/home";
import { AdminToolsPage } from "../admin-tools/admin-tools";
import { ProfilePage } from "../profile/profile";
import { DbApiService } from "../../shared/db-api.service";
import {ManageUserStockPage} from '../manage-user-stock/manage-user-stock';
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {ChatListPage} from "../chat-list/chat-list";

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  chatList   = ChatListPage;
  homeTab    = HomePage;
  adminTab   = AdminToolsPage;

  profileTab = ProfilePage;
  loginTab   = LoginPage;


  manage_user_stock = ManageUserStockPage;
  isAdmin    = false;

  userLogged : boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbapi: DbApiService,
              private auth: AuthProvider) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage', AuthProvider.currentUser);

    AuthProvider.userLogged.subscribe({next: status => {
      console.log('el usuario ha cambiado de estado, ahora está ', status);
        this.userLogged = status;
      }})

    // this.dbapi.getCurrentUser()
    //   .then((value) => this.isAdmin = value.admin);
  }

}
