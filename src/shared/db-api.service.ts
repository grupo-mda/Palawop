import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from 'rxjs';
import * as firebase from "firebase";
import {getLocaleTimeFormat} from '@angular/common';

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

  uploadItem(name: any, description: any, category: any, date: any) {
    let key = firebase.database().ref().child('products').push().key;
    firebase
      .database()
      .ref()
      .child('products')
      .child(key)
      .set({
        name: name,
        description: description,
        category: category,
        date: date,
        vendor:firebase.auth().currentUser.uid
      });
  }

  pushItem(name,description,category,date,id){
    firebase
      .database()
      .ref()
      .child("products")
      .child(id)
      .set({
        id: id,
        category: category,
        name: name,
        description: description,
        date : date,
        vendor : firebase.auth().currentUser.uid
      })
  }

  getUserData(){
    let userId = firebase.auth().currentUser.uid;
    return firebase.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then((snapshot) => { return snapshot.val()});
  }

  pushUserData(name,lastName,email,admin){
   firebase
      .database()
      .ref()
      .child("users")
      .child(firebase.auth().currentUser.uid)
      .set({
        lastName: lastName,
        name: name,
        email: email,
        admin : admin
      })
  }
  deleteUser(user_data: any) {
    this.fdb.list(`/users/${user_data.id}`).remove();
    // firebase.auth().currentUser.delete();
  }

  getStockOfUser() {
    return firebase.database()
      .ref('products')
      .orderByChild('vendor')
      .equalTo(firebase.auth().currentUser.uid)
      .once('value')
      .then((snapshot) => { return snapshot.val()});
  }

}
