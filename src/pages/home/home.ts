import {Component} from '@angular/core';
import {Events, LoadingController, NavController, ModalController, ToastController} from 'ionic-angular';
import {LoginPage} from "../login/login";
import {AuthProvider} from "../../providers/auth/auth";
import {DbApiService} from '../../shared/db-api.service';
import {ProductDetailPage} from '../product-detail/product-detail';
import {ModalComponent} from '../../components/modal/modal';
import * as _ from 'lodash';

import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  entryComponents: [
    ModalComponent
  ]
})
export class HomePage {
  private stock = [];
  favButton = false;
  favButton_1 = false;
  chatButton = false;
  chatButton_1 = false;
  doVibration = false;
  vibrationDone = true;
  private lastScroll = 0;
  private currentScroll = 0;
  public hide = false;

  constructor(public navCtrl: NavController,
              public authProvider: AuthProvider,
              public loadingController: LoadingController,
              public dbapi: DbApiService,
              public modalController: ModalController,
              public events: Events,
              public toast: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad stockPage');
    console.log(this.stock);
    let loader = this.loadingController.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present();


    this.dbapi.getListOf("products")
      .then((snapshot) => {
        for (let k in snapshot) {
          this.stock.push({
            id: k,
            name: snapshot[k].name,
            description: snapshot[k].description,
            price: snapshot[k].price,
            img: snapshot[k].img
          })
        }
      })
      .then(() => this.stock = _.chunk(this.stock, 2))
      .then(() => loader.dismiss())
  }

  itemTapped(product: any) {
    this.navCtrl.push(ProductDetailPage, product)

  }

  createModal(product: any) {
    const myModal = this.modalController.create(
      ModalComponent,
      {product: product}
    );

    myModal.present();
  }

  somethingOnFocus(event) {

    this.events.publish('favButton', this.favButton);
    this.events.publish('chatButton', this.chatButton);

    const hoverElement = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );

    const favButton = document.getElementById("fav-button");
    const chatButton = document.getElementById("chat-button");

    if (favButton != null && chatButton != null) {
      this.favButton_1 = this.favButton;
      this.favButton = favButton != null
        && (hoverElement == favButton || hoverElement == favButton.querySelector("ion-icon"));

      this.chatButton_1 = this.chatButton;
      this.chatButton = chatButton != null
        && (hoverElement == chatButton || hoverElement == chatButton.querySelector("ion-icon"));

      if (!this.favButton_1 && this.favButton
        || !this.chatButton_1 && this.chatButton) {
        navigator.vibrate(100);
        if (this.favButton) favButton.classList.add("hover");
        else chatButton.classList.add("hover");
      }

      if (this.favButton_1 && !this.favButton) favButton.classList.remove("hover");
      if (this.chatButton_1 && !this.chatButton) chatButton.classList.remove("hover");
    }
  }

  touchend(event) {

    const favButton = document.getElementById("fav-button");
    const chatButton = document.getElementById("chat-button");

    const hoverElement = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );

    if (favButton != null && (hoverElement == favButton || hoverElement == favButton.querySelector("ion-icon"))) {
      this.toast.create({
        message: 'Fav pressed',
        duration: 3000
      })
        .present();
    }

    if (chatButton != null && (hoverElement == chatButton || hoverElement == chatButton.querySelector("ion-icon"))) {
      this.toast.create({
        message: 'Chat pressed',
        duration: 3000
      })
        .present();
    }
  }

  scrollFunction(event: any) {
    this.events.publish('hideButtons', this.hide);
    this.lastScroll = this.currentScroll;
    this.currentScroll = event.scrollTop;
    this.hide = this.lastScroll < this.currentScroll;
  }
}
