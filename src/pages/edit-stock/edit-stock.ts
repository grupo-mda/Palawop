import { Component } from '@angular/core';
import { Loading, LoadingController,IonicPage, NavController, NavParams } from 'ionic-angular';
import {ProductDetailPage} from '../product-detail/product-detail';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {DbApiService} from '../../shared/db-api.service';
import {ManageStockPage} from '../manage-stock/manage-stock';
import { CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {environment} from '../../environments/environment';

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
  public_id       : string;
  private productImg;
  private loading : Loading;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: environment.cloudinary.cloud_name,
      uploadPreset: environment.cloudinary.upload_preset
    })
  );

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public formBuilder: FormBuilder,
              public dbapi: DbApiService,
              public loadingCtrl : LoadingController
  ) {
    this.item = navParams.data;
    this.productForm = this.createMyForm();
    this.productImg= this.item.img;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditStockPage',this.item);
  }
  private createMyForm(){
    return this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
    });
  }


  saveData(){
    console.log("uploading", this.productForm);
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    if(this.uploader.queue.length){
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        let res: any = JSON.parse(response);
        console.log(res);
        this.productImg = res.public_id;
        this.pushNewUserData()
      };
    }else{
      this.pushNewUserData();
    }
  }


  private pushNewUserData() {
    this.dbapi.pushItem(
      this.productForm.value.name,
      this.productForm.value.description,
      this.productForm.value.category.toString().split("\n").join("").replace(/\s/g, "").split(","),
      this.item.id,
      this.productForm.value.price,
      this.productImg

    );
    this.loading.dismiss();
  }

  backToManage() {
    this.navCtrl.pop();

  }
}
