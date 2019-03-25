import { Component, Input } from '@angular/core';
import { NavParams, NavController, ViewController } from 'ionic-angular';
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

   product:any;

  constructor(public navParams: NavParams, public viewController: ViewController) {
    this.product=navParams.data.product;
  }
  closeModal(){
    this.viewController.dismiss();
  }
  ionViewDidLoad(){
    console.log('ionViewDidLoad ModalComponent');
    console.log(this.product)

    const backdrop = document.querySelector('ion-backdrop');
    backdrop.addEventListener('mouseup', () => this.closeModal());
    const modal = document.querySelector('.scroll-content');
    modal.addEventListener('touchend', () => this.closeModal());
  }

}
