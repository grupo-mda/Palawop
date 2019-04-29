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
import { CategoryPage } from '../pages/category/category';
import {EditStockPage} from '../pages/edit-stock/edit-stock';
import {ManageProfilePage} from '../pages/manage-profile/manage-profile';
import {NewStockPage} from "../pages/new-stock/new-stock";
import {ManageUserStockPage} from '../pages/manage-user-stock/manage-user-stock';
import { CloudinaryModule, CloudinaryConfiguration } from '@cloudinary/angular-5.x';
import { Cloudinary } from 'cloudinary-core';
import {FileUploadModule} from 'ng2-file-upload';
import {ChatListPage} from "../pages/chat-list/chat-list";
import {ChatPage} from "../pages/chat/chat";
import { UserSettingsProvider } from '../providers/user-settings/user-settings';
import {IonicStorageModule} from "@ionic/storage";
import { MessageServiceProvider } from '../providers/message-service/message-service';


// import * as admin from 'firebase-admin';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TabsPage,
    AdminToolsPage,
    ProductDetailPage,
    ManageUsersPage,
    ManageStockPage,
    CategoryPage,
    EditStockPage,
    ManageProfilePage,
    NewStockPage,
    ManageUserStockPage,
    ChatListPage,
    ChatPage
  ],
  imports: [
    BrowserModule,
    ComponentsModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    FileUploadModule,
    IonicStorageModule.forRoot(),
    [
      CloudinaryModule.forRoot({Cloudinary}, { cloud_name: environment.cloudinary.cloud_name } as CloudinaryConfiguration),
    ]

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    ProfilePage,
    TabsPage,
    AdminToolsPage,
    ProductDetailPage,
    ManageUsersPage,
    ManageStockPage,
    CategoryPage,
    EditStockPage,
    ManageProfilePage,
    NewStockPage,
    ManageUserStockPage,
    ChatListPage,
    ChatPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AngularFireAuth,
    AuthProvider,
    DbApiService,
    AngularFireDatabase,
    ComponentsModule,
    UserSettingsProvider,
    MessageServiceProvider
  ]
})
export class AppModule {}
