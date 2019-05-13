import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import {ModalFormComponent} from '../../components/modal-form/modal-form';
import {DbApiService} from "../../shared/db-api.service";
import * as _ from "lodash";
import {user} from "firebase-functions/lib/providers/auth";
import {AuthProvider} from '../../providers/auth/auth';

/**
 * Generated class for the CommentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
  entryComponents: [ModalFormComponent]

})
export class CommentsPage {
  private user_comments = [];
  private user:any;
  private iAm: boolean;
  private userLogged: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalController: ModalController,
              public loadingController: LoadingController,
              public dbapi: DbApiService,
              ) {
    this.user = navParams.data;
    this.iAm = _.size(this.user) == 0;
  }

  ionViewWillEnter() {
    this.userLogged = AuthProvider.currentUser != null;
    if (this.iAm) this.user = AuthProvider.currentUser;
    const currentUser: any = AuthProvider.currentUser;
    if (currentUser != null) this.iAm = this.user.id === currentUser.id;
    this.loadContent();
  }

  goToForm() {
    console.log("añadir comentario");
    console.log(this.user);
    const myModal = this.modalController.create(
      ModalFormComponent,{user_id: this.user.id}
    );

    myModal.onDidDismiss(() => this.loadContent());
    myModal.present();
  }

  private loadContent() {
    console.log('ionViewDidLoad CommentsPage');

    if (this.iAm) {
      this.user = AuthProvider.currentUser;
    }
    let loader = this.loadingController.create({
      content: 'Obteniendo comentarios',
      spinner: 'dots'
    });
    loader.present();

    //   this.dbapi.getCommentOfUser(this.user.id);

    this.dbapi.getCommentOfUser(this.user.id)
      .then((snapshot) => {
        this.user_comments = [];
        for (let k in snapshot) {
          this.user_comments.push({
            id        : k,
            id_from   : snapshot[k].id_from,
            title     : snapshot[k].title,
            comment   : snapshot[k].comment,
            date      : snapshot[k].date
          })
        }
      })

      .then(() => loader.dismiss());

  }
}
