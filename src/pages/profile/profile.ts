import {Component} from '@angular/core';
import {App, Events, IonicPage, NavController, NavParams, PopoverController} from 'ionic-angular';
import {DbApiService} from "../../shared/db-api.service";
import {AuthProvider} from "../../providers/auth/auth";
import {ManageProfilePage} from '../manage-profile/manage-profile';
import * as _ from 'lodash';
import {ManageProfilePageModule} from '../manage-profile/manage-profile.module';
import {MessageServiceProvider} from "../../providers/message-service/message-service";
import {ChatPage} from "../chat/chat";
import {PopOverComponent} from "../../components/pop-over/pop-over";
import {ManageUserStockPage} from "../manage-user-stock/manage-user-stock";
import {ManageStockPage} from "../manage-stock/manage-stock";
import {ManageUsersPage} from "../manage-users/manage-users";

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
              private events: Events,
              public popoverCtrl: PopoverController) {
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

  signOut() {
    this.authProvider.logoutUser();
    MessageServiceProvider.unsuscribeChatList();
  }

  openChat() {
    if (ChatPage.name == this.navCtrl.getPrevious().name) this.navCtrl.pop();
    else this.navCtrl.push(ChatPage, this.user, {
      animate: true,
      animation: 'ios-transition'
    });
  }

  presentPopover(ev: any) {
    const popover = this.popoverCtrl.create(PopOverComponent,  this.user, {cssClass: 'contact-popover'});

    popover.present({ev: ev});

    console.log(this.user)

    popover.onDidDismiss(action => {
      if (action == 'close') this.signOut();
      if (action == 'edit')  this.navCtrl.push(ManageProfilePage, this.user);
      if (action == 'manage') {
        let page = this.user.admin ? ManageStockPage : ManageUserStockPage;
        this.navCtrl.push(page, this.user);
      }
      if (action == 'users')  this.navCtrl.push(ManageUsersPage, this.user);
    })
  }
}

