import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from 'rxjs';
import * as firebase from "firebase";

@Injectable()
export class DbApiService{
  currentUserData : any;

  constructor(private fdb: AngularFireDatabase){

  }
  getStock(): Observable<any> {
    return this.fdb.list('/products/').valueChanges();
  }


  deleteItem(product){
    return this.fdb.list(`/products/${product.id}`).remove();
  }

  getProductByCategory(category):Observable<any>{
    return this.fdb.object(`/products/${category}`).valueChanges()
  }

  getCategories(): Observable<any>{
    return this.fdb.list('/categoria').valueChanges();
  }
  getCategoryData(categorytId):Observable<any> {
    return this.fdb.object(`/categoria/${categorytId}`).valueChanges()
  }

  getCurrentUser(){
    let userId = firebase.auth().currentUser.uid;

    return firebase.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then((snapshot) => { return snapshot.val() });
  }

  getListOf(child: string) {
    return firebase.database()
      .ref(`/${child}`)
      .once('value')
      .then((snapshot) => { return snapshot.val() });
  }
}

