import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DbApiService } from "../../shared/db-api.service";
import { AuthProvider } from "../../providers/auth/auth";
import { LoginPage } from "../login/login";
import {ManageStockPage} from '../manage-stock/manage-stock';
import {ProfilePage} from '../profile/profile';
import {ProductDetailPage} from '../product-detail/product-detail';

/**
 * Generated class for the ManageProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage-profile',
  templateUrl: 'manage-profile.html',
})
export class ManageProfilePage {
  userForm: FormGroup;
  private user:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public formBuilder: FormBuilder,
              public authProvider: AuthProvider,
              public dbapi: DbApiService
  ) {
    this.user = navParams.data;
    this.userForm = this.createMyForm();


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ManageProfilePage',this.user);
  }
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      passwordRetry: this.formBuilder.group({
        password: ['', Validators.required],
        passwordConfirmation: ['', Validators.required]
      })
    });
  }

  saveUserData(){
    this.dbapi.pushUserData(this.userForm.value.name,
      this.userForm.value.lastName,
      this.userForm.value.email,
      this.user.admin
    );
  }
  backToProfile() {
    this.navCtrl.pop()
  }
}
