import { Component } from '@angular/core';
import { IonicPage,Loading,NavController, NavParams, LoadingController } from 'ionic-angular';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from "../../shared/db-api.service";
import { CloudinaryOptions, CloudinaryUploader} from 'ng2-cloudinary';
import {environment} from '../../environments/environment';


@IonicPage()
@Component({
  selector: 'page-new-stock',
  templateUrl: 'new-stock.html',
})
export class NewStockPage {
  private item:any;
  productForm: FormGroup;
  private categories:any;
  private ProductPhoto;
  private loading: Loading;
  public_id: string;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({
      cloudName: environment.cloudinary.cloud_name,
      uploadPreset: environment.cloudinary.upload_preset
    })
  );
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
          this.categories = data;
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
      price: ['', Validators.required],
    });
  }

  saveData(){
    console.log("uploading");
    this.loading = this.loadingCtrl.create();
    this.loading.present();

    this.uploader.uploadAll();
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      console.log(res);
      this.public_id = res.public_id;
      this.dbapi.uploadItem(this.productForm.value.name,
        this.productForm.value.description,
        this.productForm.value.category.toString().split("\n").join("").replace(/\s/g, "").split(","),
        this.productForm.value.price,
        this.public_id
      )
        .then(() => this.backToManage());
    };
    this.uploader.onErrorItem = function (fileItem, response, status, headers) {
      console.info('onErrorItem', fileItem, response, status, headers);
      this.backToManage();
    };



  }

  backToManage(){
    this.loading.dismiss();
    this.navCtrl.pop();
  }

}
