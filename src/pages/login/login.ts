import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { HomePage } from "../home/home";
import { RegisterPage } from "../register/register";
import { User } from "../../shared/model/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user: User = {} as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
  }

  async login(user: User) {
    try {
      const res = await this.afAuth.auth.signInWithEmailAndPassword(
        user.email,
        user.password
      );
      if (res) this.navCtrl.setRoot(
        HomePage,
        {},
        {
          animate: true,
          direction: 'forward'
        });
      console.log(res);

    }
    catch (e) {
      console.error(e);
    }
  }

  register() {
    this.navCtrl.push(RegisterPage);
  }
}
