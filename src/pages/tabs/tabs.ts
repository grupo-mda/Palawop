import { Component } from '@angular/core';
import {AlertController, Events, IonicPage, NavController, NavParams} from 'ionic-angular';
import { HomePage } from "../home/home";
import { AdminToolsPage } from "../admin-tools/admin-tools";
import { ProfilePage } from "../profile/profile";
import { DbApiService } from "../../shared/db-api.service";
import {ManageUserStockPage} from '../manage-user-stock/manage-user-stock';
import {AuthProvider} from "../../providers/auth/auth";
import {LoginPage} from "../login/login";
import {ChatListPage} from "../chat-list/chat-list";
import {MessageServiceProvider} from "../../providers/message-service/message-service";

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

  chatList = ChatListPage;
  homeTab = HomePage;
  adminTab = AdminToolsPage;

  profileTab = ProfilePage;
  loginTab = LoginPage;


  manage_user_stock = ManageUserStockPage;
  isAdmin = false;

  userLogged: boolean;
  pendingChats: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbapi: DbApiService,
              private messageService: MessageServiceProvider,
              private events: Events) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage', AuthProvider.currentUser);

    AuthProvider.userLogged.subscribe({
      next: status => {
        console.log('el usuario ha cambiado de estado, ahora está ', status);
        this.userLogged = status;
        if (status) this.messageService.startChatListObserver();
      }
    });

    this.events.subscribe('chatList', () => {
      let notReadedMessages = 0;
      MessageServiceProvider.chats.forEach(value => notReadedMessages += value.notReaded);
      this.pendingChats = notReadedMessages == 0 ? '' : '' + notReadedMessages;
    });

  }
}
