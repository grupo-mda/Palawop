import {Component, Input} from '@angular/core';
import {NavParams, NavController, ViewController, Events} from 'ionic-angular';
import {cpus} from "os";

/**
 * Generated class for the ModalComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {

  product: any;
  favButton = false;
  chatButton = false;

  constructor(public navParams: NavParams,
              public viewController: ViewController,
              public events: Events) {
    this.product = navParams.data.product;
    events.subscribe('favButton', (status) => this.favButton = status);
    events.subscribe('chatButton', (status) => this.chatButton = status);
  }

  closeModal() {
    this.viewController.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ModalComponent');
    console.log(this.product)

    const backdrop = document.querySelector('ion-backdrop');
    backdrop.addEventListener('mouseup', () => this.closeModal());
    const modal = document.querySelector('.scroll-content');
    modal.addEventListener('touchend', () => this.closeModal());

  }
}
