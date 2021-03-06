import { Component } from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {EditStockPage} from '../edit-stock/edit-stock';
import {NewStockPage} from '../new-stock/new-stock';
import {DbApiService} from "../../shared/db-api.service";
import {ProductDetailPage} from '../product-detail/product-detail';

/**
 * Generated class for the ManageUserStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-user-stock',
  templateUrl: 'manage-user-stock.html',
})
export class ManageUserStockPage {

  user_stock: any = [];
  private loading: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController,
              public dbapi: DbApiService,
              public alertCtrl: AlertController) {

  }

  ionViewWillEnter() {
    console.log('ionViewDidLoad ManageUserStockPage');

    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.dbapi.getStockOfUser()
      .then((snapshot) => {
        this.user_stock = [];
        for (let k in snapshot) {
          this.user_stock.push({
            id          : k,
            name        : snapshot[k].name,
            description : snapshot[k].description,
            price       : snapshot[k].price,
            img         : snapshot[k].img,
            vendor      : snapshot[k].vendor,
            category    : snapshot[k].category,

          })
        }
      })
      .then(() => this.loading.dismiss());
  }


  itemDelete(product){
    const confirm = this.alertCtrl.create({
      title: 'r u sure?',
      message: 'This is 4eva',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            this.user_stock.splice(this.user_stock.findIndex(
              (productId) => {return productId.id == product.id }
              ),1
            );
            this.dbapi.deleteItem(product);
            console.log('Agree clicked');
          }
        }
      ]
    });
    confirm.present();
  }

  
  editItem(item) {
    this.navCtrl.push(EditStockPage,item);
  }

  uploadItem() {
    this.navCtrl.push(NewStockPage);
  }
  productDetail(item){
    console.log(item);
    this.navCtrl.push(ProductDetailPage,item);
  }

}

