import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import {ModalFormComponent} from '../../components/modal-form/modal-form';
import {DbApiService} from "../../shared/db-api.service";
import * as _ from "lodash";
import {user} from "firebase-functions/lib/providers/auth";

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

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public modalController: ModalController,
              public loadingController: LoadingController,
              public dbapi: DbApiService,
              ) {
    this.user=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentsPage');
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
          })
        }
      })

      .then(() => loader.dismiss());

  }

  goToForm() {
    console.log("añadir comentario");
    console.log(this.user);
    const myModal = this.modalController.create(
      ModalFormComponent,{user_id: this.user.id}
    )
    myModal.present();
  }
}
