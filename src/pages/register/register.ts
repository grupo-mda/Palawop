import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from "../../shared/model/user";
import { HomePage } from "../home/home";



/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user: User = {} as User;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  backToLogin() {
    if (this.navCtrl.canGoBack()) this.navCtrl.pop();
    else this.navCtrl.push(LoginPage,
      {},
      {
        animate: true,
        direction: 'back'
      });
  }

  async signUp(user: User) {

    try {
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(
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

    } catch (e) {
      console.error(e);
    }
  }
}
