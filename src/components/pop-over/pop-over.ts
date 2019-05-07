import {Component} from '@angular/core';
import {NavController, NavParams, ViewController} from "ionic-angular";
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

  text    : string;
  items   : any;
  isAdmin : boolean;

  constructor(public viewCtrl: ViewController,
              public authProvider: AuthProvider,
              public navParams: NavParams,
              public navCtrl: NavController) {
    console.log('Hello PopOverComponent Component');
    this.isAdmin = navParams.data.admin;
    this.items = [
      {name: 'Edit profile', action: 'edit',   hidden: false},
      {name: 'Manage stock', action: 'manage', hidden: false},
      {name: 'Manage users', action: 'users',  hidden: !this.isAdmin},
      {name: 'Sign out',     action: 'close',  hidden: false},
    ];
  }

  itemClick(item: any) {
    this.viewCtrl.dismiss(item.action,
      null,
      {animate: false});
  }

}
