import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController } from 'ionic-angular';
import { DbApiService } from '../../shared/db-api.service';
import { ProductDetailPage } from '../product-detail/product-detail';
import { ModalComponent } from '../../components/modal/modal';
import { ProfilePage } from '../profile/profile';
import { ChatPage } from '../chat/chat';
import { Page } from 'ionic-angular/umd/navigation/nav-util';

/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

  category:any;
  productCategory:any = [];

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public dbapi:DbApiService,
              public loadingController: LoadingController,
              public modalController: ModalController
              ) {
    this.category=navParams.data;
    console.log(this.navParams);
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.dbapi.getStock()
        .subscribe(data => {
          for ( let i in data) {
            if(data[i].category.includes(this.category.value)){
              this.productCategory.push(data[i]);
              console.log(this.productCategory);
            }
          }
        });
        console.log(this.productCategory);
        loader.dismiss();

    });

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');

  }

  itemTapped(product:any) {
    this.navCtrl.push(ProductDetailPage,product)

  }
 createModal(product:any){
    const myModal = this.modalController.create(
      ModalComponent,
      {product:product}
    );
    
    
    myModal.present();
  
  }
  touchend(event) {

    const profileButton = document.getElementById("profile-button");
    const chatButton = document.getElementById("chat-button");

    const hoverElement = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );

    if (profileButton != null && (hoverElement == profileButton || hoverElement == profileButton.querySelector("ion-icon"))) {
      this.openPage(ProfilePage, 'wp-transition');
    }

    if (chatButton != null && (hoverElement == chatButton || hoverElement == chatButton.querySelector("ion-icon"))) {
      this.openPage(ChatPage, 'ios-transition');
    }
  }
  
  private openPage(page: Page, animation: string) {
    this.navCtrl.push(
      page,
      ModalComponent.owner,
      {
        animate: true,
        animation: animation
      });
  }

}
