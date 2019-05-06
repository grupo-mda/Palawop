import {Component} from '@angular/core';
import {NavController, ViewController} from "ionic-angular";
import {ManageProfilePage} from "../../pages/manage-profile/manage-profile";
import {MessageServiceProvider} from "../../providers/message-service/message-service";
import {AuthProvider} from "../../providers/auth/auth";

/**
 * Generated class for the PopOverComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'pop-over',
  templateUrl: 'pop-over.html'
})
export class PopOverComponent {

  text: string;
  items: any;

  constructor(public viewCtrl: ViewController,
              public authProvider: AuthProvider,
              public navCtrl: NavController) {
    console.log('Hello PopOverComponent Component');
    this.items = [
      {name: 'Edit profile', action: 'edit'},
      {name: 'Manage stock', action: 'manage'},
      {name: 'Sign out',     action: 'close'}
    ];
  }

  itemClick(item: any) {
    this.viewCtrl.dismiss(item.action,
      null,
      {animate: false});
  }

}
