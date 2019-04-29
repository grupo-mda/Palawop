import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/database";
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import * as firebase from "firebase";
import {getLocaleTimeFormat} from '@angular/common';
import {UserSettingsProvider} from "../providers/user-settings/user-settings";
import {AuthProvider} from "../providers/auth/auth";
import {Events} from "ionic-angular";
import * as _ from 'lodash';


@Injectable()
export class DbApiService{
  currentUserData : any;

  constructor(private fdb      : AngularFireDatabase,
              private settings : UserSettingsProvider,
              private events   : Events){

  }
  getStock(): Observable<any> {
    return this.fdb.list('/products/').valueChanges();
  }


  deleteItem(product){
    return this.fdb.list(`/products/${product.id}`).remove();
  }

  getProductByCategory(category):Observable<any>{
    console.log("Entra en getProductByCategory");
    return this.fdb.object(`/products/`).valueChanges();
  }

  getCategories(): Observable<any>{
    return this.fdb.list('/categoria').valueChanges();
  }
  getCategoryData(categorytId):Observable<any> {
    return this.fdb.object(`/categoria/${categorytId}`).valueChanges()
  }

  getCurrentUser(){
    let userId = firebase.auth().currentUser.uid;
    return this.getUserData(userId);
  }


  getUserData(userId: string){
    return firebase.database()
      .ref(`/users/${userId}`)
      .once('value')
      .then((snapshot) => { return _.assign(snapshot.val(), {'id': userId})});
  }


  getListOf(child: string) {
    return firebase.database()
      .ref(`/${child}`)
      .once('value')
      .then((snapshot) => { return snapshot.val() });
  }

  uploadItem(name: any, description: any, category: any, price: any,img: any) {
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
        date:firebase.database.ServerValue.TIMESTAMP,
        vendor:firebase.auth().currentUser.uid,
        price: price,
        img: img
      });
  }


  pushItem(name,description,category,id,price){
    firebase
      .database()
      .ref()
      .child("products")
      .child(id)
      .set({
        id: id,
        category: category,
        name: name,
        price: price,
        description: description,
        date :firebase.database.ServerValue.TIMESTAMP,
        vendor : firebase.auth().currentUser.uid
      })
  }


  pushUserData(name, lastName, email, admin) {

    let uid = firebase.auth().currentUser.uid;

    firebase
      .database()
      .ref()
      .child("users")
      .child(uid)
      .set({
        lastName: lastName,
        name: name,
        email: email,
        admin: admin
      })
      .then(() => this.getCurrentUser()
        .then(value => {
          this.settings.login(value);
          AuthProvider.currentUser = value;
        }))
      .then(() => this.events.publish('newUserData'))
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


  getListOfMyChats(myUserId: string): Observable<any> {

    console.log('-------> ',myUserId)

    this.settings.getCurrentUser().then(value => console.log(value.uid));

    if (myUserId != '') {

      let date = new Date();

      return this.fdb.list(`chats/${myUserId}`).stateChanges()
        .pipe(map(async user => {
          let chat: any;
          await this.getUserData(user.key)
            .then(userData => chat = userData)
            .then(() => this.getLastChatMessage(user.key)
              .then(lastMsg => _.assign(chat, {
                'id': user.key,
                'lastMsgText': lastMsg.text,
                'lastMsgTimestamp': lastMsg.timestamp,
                'currentTime': date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()
              })))
            .then(async () => {
              this.getCountNotReadedMessages(user.key)
                .then(cosos => _.assign(chat, {
                  'notReaded' : cosos
                }))
            })
            .then(() => this.getTypingStatus(user.key)
              .then(writingStatus => _.assign(chat, {
                'typing': writingStatus
              })))
            .then(() => this.settings.saveChatList(chat))
            .then(() => console.log('conversation: ', chat))
          ;
          // console.log('db: ', chat);
          return chat;
        }));

    } else {
      return null;
    }
  }


  getLastChatMessage(otherUserId: string) {
    let myUserId = firebase.auth().currentUser.uid;

    return firebase.database()
      .ref(`chats/${myUserId}/${otherUserId}/messages`)
      .limitToLast(1)
      .once('child_added')
      .then((snapshot) => {
        return snapshot.val()
      });
  }


  private getCountNotReadedMessages(anotherUserId: string) {
    let myUserId = firebase.auth().currentUser.uid;

    return firebase
      .database()
      .ref()
      .child('chats')
      .child(myUserId)
      .child(anotherUserId)
      .child('messages')
      .orderByChild('readed')
      .equalTo(false)
      .once('value')
      .then(count => {return _.size(count.val())})
  }


  private getTypingStatus(otherUserId: string) {
    let myUserId = firebase.auth().currentUser.uid;

    return firebase.database()
      .ref(`chats/${myUserId}/${otherUserId}/typing`)
      .once('value')
      .then((snapshot) => {
        return snapshot.val()
      });
  }


  getChat(otherUserId: string)/*: Observable<any> */{
    let myUserId = firebase.auth().currentUser.uid;

    firebase.database()
      .ref(`/chats/${myUserId}/${otherUserId}/messages`)
      .on('child_added', value => {
        this.settings.saveMessage(otherUserId, value);
        this.events.publish('chat', _.assign(value.val(), {'id': value.key}));
      });

    firebase.database()
      .ref(`chats/${myUserId}/${otherUserId}/typing`)
      .on('value', typing => {
        this.events.publish('chat', typing.val());
      });
  }

  markAsRead(anotherUserId: string, msgId: string) {

    let myUserId = firebase.auth().currentUser.uid;

    firebase.database()
      .ref()
      .child('chats')
      .child(myUserId)
      .child(anotherUserId)
      .child('messages')
      .child(msgId)
      .child('readed')
      .set(true);
  }


  pushMessage(newMessage: {
                timestamp : Object,
                from      : string,
                readed    : boolean,
                text      : string },
              myId          : string,
              anotherUserId : string) {

    const updates = {};
    const newMessageKey = firebase.database().ref().child("chats").push().key;
    updates[`chats/${myId}/${anotherUserId}/messages/${newMessageKey}`] = newMessage;
    updates[`chats/${anotherUserId}/${myId}/messages/${newMessageKey}`] = newMessage;
    return firebase.database().ref().update(updates);
  }


  push(child: string, data: {}, key?: string) {
    if (key == null) key = child === "users" ?
      firebase.auth().currentUser.uid :
      firebase.database().ref().child(child).push().key;

    return firebase
      .database()
      .ref()
      .child(child)
      .child(key)
      .set(data);
  }

  removeChat(id: any) {
    console.log(id);
    let myUserId = firebase.auth().currentUser.uid;
    firebase.database()
      .ref('chats')
      .child(myUserId)
      .child(id)
      .remove();
    this.settings.removeChat(id);
  }
}
