import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Modal } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2'
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth'
import { environment } from '../environments/environment';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { RegisterPage } from "../pages/register/register";
import { SplashPage } from "../pages/splash/splash";
import { AuthProvider } from '../providers/auth/auth';
import {DbApiService} from '../shared/db-api.service';
import {AngularFireDatabase} from "@angular/fire/database";
import {ProductDetailPage} from '../pages/product-detail/product-detail';
import { ComponentsModule } from '../components/components.module';
import { ModalComponent } from '../components/modal/modal';
import { ProfilePage } from "../pages/profile/profile";
import { AdminToolsPage } from "../pages/admin-tools/admin-tools";
import { TabsPage } from "../pages/tabs/tabs";
import {ManageUsersPage} from "../pages/manage-users/manage-users";
import {ManageStockPage} from "../pages/manage-stock/manage-stock";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TabsPage,
    AdminToolsPage,
    ProductDetailPage,
    ManageUsersPage,
    ManageStockPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence()

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TabsPage,
    AdminToolsPage,
    ProductDetailPage,
    ManageUsersPage,
    ManageStockPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    DbApiService,
    AngularFireDatabase,
    ComponentsModule
  ]
})
export class AppModule {}
