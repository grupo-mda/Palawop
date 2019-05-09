import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {DbApiService} from '../../shared/db-api.service';
import {LoadingController} from 'ionic-angular';
import { ProfilePage } from "../profile/profile";
import {StarRatingModule} from "ionic3-star-rating";
import {CommentsPage} from "../comments/comments";

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
  private author: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public dbapi: DbApiService,
              public loadingController: LoadingController) {
    this.product = navParams.data;
  }

  ionViewDidLoad(){
    let authorId = this.product.vendor;
    this.dbapi.getUserData(authorId).then(value => this.author = value);
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter ProductDetailPage');
  }

  viewAuthor(){
    this.navCtrl.push(ProfilePage, this.author);
  }


}
