import { Component } from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import { LoginPage } from "../login/login";
import { AuthProvider } from "../../providers/auth/auth";
import {DbApiService} from '../../shared/db-api.service';
import {ProductDetailPage} from '../product-detail/product-detail';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  private stock: any;

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,
              public loadingController: LoadingController,
              public dbapi: DbApiService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad stockPage')
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.dbapi.getStock()
        .subscribe(data => this.stock = data
          
        );
        
      loader.dismiss();

    });
    
  }
/*
  signOut() {
    this.authProvider.logoutUser()
      .then(() => this.navCtrl.setRoot(
        LoginPage,
        {},
        {
          animate: true,
          direction: 'back'
        }));
  }
  */
  itemTapped(product:any) {
    this.navCtrl.push(ProductDetailPage,product)

  }
}
