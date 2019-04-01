import { Component,ViewChild } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { LoadingController, NavController } from 'ionic-angular';
import { DbApiService } from '../../shared/db-api.service';
import { Slides } from 'ionic-angular';
import { CategoryPage } from '../../pages/category/category';

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
  @ViewChild(Slides) slides: Slides;

  constructor(public afAuth: AngularFireAuth,
              public loadingCtrl: LoadingController,
              public dbapi: DbApiService,
              public navCtrl:NavController) {
    console.log('Hello CategoryNavComponent Component');
    let loader = this.loadingCtrl.create({
      content: 'Accediendo a los datos',
      spinner: 'dots'
    });

    loader.present().then(() => {
      this.dbapi.getCategories()
        .subscribe(data => {
          this.categories = data
        });
        
      loader.dismiss();

    });
  } 

  categoryTapped($event:any,category:any) {
    this.navCtrl.push(CategoryPage,category);
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }
}
