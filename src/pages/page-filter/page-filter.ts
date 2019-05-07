import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events, ModalController } from 'ionic-angular';
import { ModalComponent } from '../../components/modal/modal';
import { Page } from 'ionic-angular/umd/navigation/nav-util';
import { ProfilePage } from '../profile/profile';
import { ChatPage } from '../chat/chat';
import { ProductDetailPage } from '../product-detail/product-detail';

/**
 * Generated class for the PageFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-page-filter',
  templateUrl: 'page-filter.html',
})
export class PageFilterPage {

  private stock = [];
  profileButton = false;
  profileButton_1 = false;
  chatButton = false;
  chatButton_1 = false;
  doVibration = false;
  vibrationDone = true;
  private lastScroll = 0;
  private currentScroll = 0;
  public hide = false;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public modalController:ModalController,
              public events:Events) {
    
    console.log(this.navParams.data);
    this.stock=this.navParams.data;
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

    //this.events.publish('profileButton', this.profileButton);
    //this.events.publish('chatButton', this.chatButton);

    const hoverElement = document.elementFromPoint(
      event.changedTouches[0].pageX,
      event.changedTouches[0].pageY
    );

    const profileButton = document.getElementById("profile-button");
    const chatButton = document.getElementById("chat-button");

    if (profileButton != null && chatButton != null) {
      this.profileButton_1 = this.profileButton;
      this.profileButton = profileButton != null
        && (hoverElement == profileButton || hoverElement == profileButton.querySelector("ion-icon"));

      this.chatButton_1 = this.chatButton;
      this.chatButton = chatButton != null
        && (hoverElement == chatButton || hoverElement == chatButton.querySelector("ion-icon"));

      if (!this.profileButton_1 && this.profileButton
        || !this.chatButton_1 && this.chatButton) {
        navigator.vibrate(100);
        if (this.profileButton) profileButton.classList.add("hover");
        else chatButton.classList.add("hover");
      }

      if (this.profileButton_1 && !this.profileButton) profileButton.classList.remove("hover");
      if (this.chatButton_1 && !this.chatButton) chatButton.classList.remove("hover");
    }
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

  scrollFunction(event: any) {
    //this.events.publish('hideButtons', this.hide);
    this.lastScroll = this.currentScroll;
    this.currentScroll = event.scrollTop;
    this.hide = this.lastScroll < this.currentScroll;
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
