import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {DbApiService} from "../../shared/db-api.service";
import {ProductDetailPage} from '../product-detail/product-detail';
import {ManageUsersPage} from '../manage-users/manage-users';
import {EditStockPage} from '../edit-stock/edit-stock';
import {NewStockPage} from "../new-stock/new-stock";

/**
 * Generated class for the ManageStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-stock',
  templateUrl: 'manage-stock.html',
})
export class ManageStockPage {

  stock_data: any = [];
  private loading: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public dbapi: DbApiService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageStockPage');

    let data = [];

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.dbapi.getListOf("products")
      .then((snapshot) => {
        for (let k in snapshot) {
          data.push({
            id          : k,
            name        : snapshot[k].name,
            description : snapshot[k].description,
            price       : snapshot[k].price,
            img         : snapshot[k].img,
            vendor      : snapshot[k].vendor,
            category    : snapshot[k].category,
          })
        }
        this.stock_data = data;
      })
      .then(() => this.loading.dismiss());
  }
  itemDelete(product){
    this.stock_data.splice(this.stock_data.findIndex(
      (productId) => {return productId.id == product.id }
    ),1
    );
    this.dbapi.deleteItem(product);
  }
  itemTappedAdmin(product:any) {
    this.navCtrl.push(ProductDetailPage,product)

  }
  editItem(item) {
    this.navCtrl.push(EditStockPage,item);
  }

  uploadItem() {
    this.navCtrl.push(NewStockPage);
  }
}
