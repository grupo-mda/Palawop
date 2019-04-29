import { Component,ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {Events, LoadingController, NavController, ViewController} from 'ionic-angular';
import { DbApiService } from '../../shared/db-api.service';
import { Slides } from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';
import {NewStockPage} from "../../pages/new-stock/new-stock";

/**
 * Generated class for the CategoryNavComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'category-nav',
  templateUrl: 'category-nav.html'
})
export class CategoryNavComponent {

  categories:any;
  hide: boolean = false;
  @ViewChild(Slides) slides: Slides;


  constructor(public afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController,
              public dbapi: DbApiService,
              public navCtrl:NavController,
              public events: Events) {
    events.subscribe('hideButtons', (status) => {
      this.hide = status;
    });
    console.log('Hello CategoryNavComponent Component');
    // let loader = this.loadingCtrl.create({
    //   content: 'Accediendo a los datos',
    //   spinner: 'dots'
    // });

    // loader.present().then(() => {
      this.dbapi.getCategories()
        .subscribe(data => {
          this.categories = data
        });
        
      // loader.dismiss();
    // });
  } 

  categoryTapped($event:any,category:any) {
    if (category.name == 'add') this.navCtrl.push(NewStockPage,category);
    else this.navCtrl.push(CategoryPage,category);
  }
}
