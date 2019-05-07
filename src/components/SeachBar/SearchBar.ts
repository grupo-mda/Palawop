import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { DbApiService } from '../../shared/db-api.service';
import { ProductDetailPage } from '../../pages/product-detail/product-detail';
import { PageFilterPage } from '../../pages/page-filter/page-filter';
import { setServers } from 'dns';

/**
 * Generated class for the TitleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'searchBar',
  templateUrl: 'SearchBar.html'
})
export class SearchBarComponent {

  searchQuery: string = '';
  items: any[];
  itemsConst:any[];
  list:boolean=false;
  searchMode:boolean=true;
  
  constructor(public navCtrl:NavController,
            public dbapi:DbApiService,
            public loadingCtrl:LoadingController) {
              let loading = loadingCtrl.create({
                content:'Accediendo a la base de datos',
                spinner: 'dots'
              })
              loading.present().then(
                ()=>{
                  this.dbapi.getStock().subscribe(data => this.itemsConst=data);
                  loading.dismiss();
                  
                });
  }

  getItems($event: any){
    const val = $event.target.value;
    if(val != ''){
      this.items = this.itemsConst.filter(
        (item) => {return item.name.toLowerCase()
                              .indexOf(val.toLowerCase()) > -1;}
      )
      if(this.items.length!=0){
        this.list=true;

      }
    }else{
      this.items=this.itemsConst;
      this.list=false;
    } 
  }

  printList(){
    this.list=!this.list;
  }

  setSearchMode(){
    this.items=[];
    this.searchMode=!this.searchMode;
  }

  goProduct(item){
    this.navCtrl.push(ProductDetailPage,item);
  }
  goPageFilter(){
    this.navCtrl.push(PageFilterPage,this.items);
    this.setSearchMode();
  }
}
