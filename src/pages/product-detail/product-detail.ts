import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DbApiService} from '../../shared/db-api.service';
import * as _ from 'lodash';
import {LoadingController} from 'ionic-angular';
/**
 * Generated class for the ProductDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-detail',
  templateUrl: 'product-detail.html',
})
export class ProductDetailPage {
  private product: any;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbapi: DbApiService,
              public loadingController: LoadingController) {
  }
/*
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductDetailPage');
  }
  */
  ionViewWillEnter(){
    console.log('ionViewWillEnter ProductDetailPage');

    let loader = this.loadingController.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.dbapi.getProductData(1)
        .subscribe(data => {this.product = data;
            return data;
        }
        );

      loader.dismiss();

    });
  }


}
