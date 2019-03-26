import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductDetailPage} from '../product-detail/product-detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the EditStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-stock',
  templateUrl: 'edit-stock.html',
})
export class EditStockPage {
  private item:any;
  productForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  public formBuilder: FormBuilder) {
    this.item = navParams.data;
    this.productForm = this.createMyForm();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStockPage',this.item);
  }
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }
  saveData(){

  }
}
