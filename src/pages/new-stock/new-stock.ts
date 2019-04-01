import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from "../../shared/db-api.service";
import {ManageStockPage} from "../manage-stock/manage-stock";
import { database } from 'firebase';

/**
 * Generated class for the NewStockPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-stock',
  templateUrl: 'new-stock.html',
})
export class NewStockPage {
  private item:any;
  productForm: FormGroup;
  private categories:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbapi: DbApiService,
              public loadingCtrl: LoadingController) {
    this.item = navParams.data;
    this.productForm = this.createForm();
    
    let loader = this.loadingCtrl.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.dbapi.getCategories()
        .subscribe(data => {
          this.categories = data
          console.log(this.categories);
        });
        
      loader.dismiss();

    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewStockPage');
  }

  private createForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  saveData(){
      this.dbapi.uploadItem(this.productForm.value.name,
        this.productForm.value.description,
        this.productForm.value.category.trim(),
        this.productForm.value.date
      );
  }

  backToManage(){
    this.navCtrl.pop();
  }

}
