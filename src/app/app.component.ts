import {Component} from '@angular/core';
import {LoadingController, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {HomePage} from '../pages/home/home';
import * as firebase from "firebase";
import {environment} from "../environments/environment";
import {TabsPage} from "../pages/tabs/tabs";
import {LoginPage} from "../pages/login/login";
import {AuthProvider} from "../providers/auth/auth";
import {DbApiService} from "../shared/db-api.service";
import {UserSettingsProvider} from "../providers/user-settings/user-settings";
import {MessageServiceProvider} from "../providers/message-service/message-service";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage: any;

  constructor(platform                : Platform,
              statusBar               : StatusBar,
              splashScreen            : SplashScreen,
              dbapi                   : DbApiService,
              private authProvider    : AuthProvider,
              private settings        : UserSettingsProvider,
              private messageProvider : MessageServiceProvider
              ) {
    platform.ready().then(() => {

      statusBar.styleDefault();
      splashScreen.hide();

    });

    console.log('ionViewDidLoad SplashPage');



    this.loadUserFromLocal()
      .then(() => this.rootPage = TabsPage
      )
  }

  async loadUserFromLocal(){
    let userLocal: any;
    await this.settings.getCurrentUser().then(value => userLocal = value);
    console.log('storage', userLocal ? userLocal : 'nope');
    if (userLocal) {
      this.messageProvider.startChatListObserver();
      AuthProvider.currentUser = userLocal;
    }
    AuthProvider.userLogged.next(!!userLocal)
  }
}

