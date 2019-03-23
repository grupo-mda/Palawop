import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from 'rxjs';

@Injectable()
export class DbApiService{
  constructor(private fdb: AngularFireDatabase){

  }
  getStock(): Observable<any> {
    return this.fdb.list('/products').valueChanges();
  }
  getProductData(productId):Observable<any> {
    return this.fdb.object(`/products/${productId}`).valueChanges()
  }
}
