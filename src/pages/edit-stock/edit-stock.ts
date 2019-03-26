import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductDetailPage} from '../product-detail/product-detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DbApiService} from '../../shared/db-api.service';
import {ManageStockPage} from '../manage-stock/manage-stock';

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
  public formBuilder: FormBuilder,
  public dbapi: DbApiService) {
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
  this.dbapi.pushItem(this.productForm.value.name,
    this.productForm.value.description,
    this.productForm.value.category,
    this.productForm.value.date,
    this.item.id
  );
  }
  backToManage() {
    this.navCtrl.push(ManageStockPage)

  }
}
