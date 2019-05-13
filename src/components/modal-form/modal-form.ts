import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DbApiService} from '../../shared/db-api.service';
import {NavParams, NavController, LoadingController} from "ionic-angular";

/**
 * Generated class for the ModalFormComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'modal-form',
  templateUrl: 'modal-form.html'
})
export class ModalFormComponent {

  id_user: string
  text: string;
  commentForm: FormGroup;


  constructor(public dbapi: DbApiService,
              public formBuilder: FormBuilder,
              public navParams: NavParams,
              public loadingController: LoadingController,
              public navCtrl: NavController) {
    console.log('Hello ModalFormComponent Component');
    this.text = 'Hello World';
    this.commentForm = this.createForm();
    this.id_user=this.navParams.data.user_id;
    console.log(this.id_user);
  }

  saveComment() {

    let loader = this.loadingController.create({
      content: 'Obteniendo comentarios',
      spinner: 'dots'
    });
    loader.present();

    this.dbapi.pushComment(this.commentForm.value.title,
      this.commentForm.value.comment, this.id_user
    )
      .then(() => {
        this.closeModal();
        loader.dismiss();
      });

    console.log("se envia el formulario");
  }

  private createForm() {
    return this.formBuilder.group({
      title: ['', Validators.required],
      comment: ['', Validators.required],
    });
  }
  closeModal(){
    this.navCtrl.pop();
  }
}
