import { Component } from '@angular/core';

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
  items: string[] = ['hola','cosa','hola2'];
  itemsConst:string[];
  list:boolean=false;
  searchMode:boolean=true;
  
  constructor() {
    this.itemsConst=this.items;
  }

  getItems($event: any){
    const val = $event.target.value;
    if(val != ''){
      this.items = this.items.filter(
        (item) => {return item.toLowerCase()
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
    this.searchMode=!this.searchMode;
  }
}
