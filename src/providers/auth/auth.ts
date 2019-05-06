import {Injectable} from '@angular/core';
import firebase from 'firebase';
import {BehaviorSubject} from "rxjs";
import {UserSettingsProvider} from "../user-settings/user-settings";
import {DbApiService} from "../../shared/db-api.service";
import * as _ from "lodash";

@Injectable()
export class AuthProvider {

  static userLogged  = new BehaviorSubject(false);
  static currentUser : firebase.database.DataSnapshot;

  private homeTabId    = 'tab-t0-0';
  private profileTabId = 'tab-t0-3';

  constructor(private settings : UserSettingsProvider,
              private dbapi    : DbApiService) {
  }

  loginUser(email: string, password: string): Promise<any> {

    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.dbapi.getCurrentUser()
        .then(value => {
          this.settings.login(value);
          AuthProvider.currentUser = value;
        }))
      .then(() => AuthProvider.userLogged.next(true))
      .then(() => document.getElementById(this.profileTabId).click());
  }

  signupUser(email: string, password: string): Promise<any> {

    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        let uid = response.user.uid;
        firebase
          .database()
          .ref()
          .child("users")
          .child(uid)
          .set({
            admin: false,
            name: "",
            email: email
          });
      })
      .then(() => this.dbapi.getCurrentUser()
        .then(value => {
          this.settings.login(value);
          AuthProvider.currentUser = value;
        }))
      .then(() => AuthProvider.userLogged.next(true))
      .then(() => document.getElementById(this.profileTabId).click());
  }

  logoutUser(): Promise<void> {
    AuthProvider.userLogged.next(false);
    AuthProvider.currentUser = null;
    this.settings.logout();
    return firebase.auth().signOut()
      .then(() => document.getElementById(this.homeTabId).click());
  }

  // deleteUser(user): Promise<any> {
  //   return firebase.auth().deleteUser(user.id)
  //     .then(function() {
  //       console.log("Successfully deleted user");
  //     })
  //     .catch(function(error) {
  //       console.log("Error deleting user:", error);
  //     });
  // }
}
