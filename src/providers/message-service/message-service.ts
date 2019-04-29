import {Injectable} from '@angular/core';
import {DbApiService} from "../../shared/db-api.service";
import {Events, ToastController} from "ionic-angular";
import * as _ from "lodash"
import {UserSettingsProvider} from "../user-settings/user-settings";
import {Subscription} from "rxjs";

@Injectable()
export class MessageServiceProvider {

  static chats: any = [];
  static chatSubscription : Subscription;


  constructor(public dbapi      : DbApiService,
              private events    : Events,
              private settings  : UserSettingsProvider,
              private toastCtrl : ToastController) {
    console.log('Hello MessageServiceProvider Provider');
  }


  async startChatListObserver() {
    console.log('message provider: loading chatlist from local database');
    await this.getFromLocalDataBase();
    let user;
    await this.settings.getCurrentUser().then(value => user = value);
    console.log('here: ',user)
    if (user) this.getFromInternet(user.id);
  }


  getFromInternet(userId: string) {
    let userChatsSubscription = this.dbapi.getListOfMyChats(userId);

    // evitar multiples suscripciones
    if (userChatsSubscription && MessageServiceProvider.chatSubscription == null) {
      console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaa')
      MessageServiceProvider.chatSubscription = userChatsSubscription
        .subscribe(data => {
            data.then(chat => {

              // this.showNotification(chat.name, chat.lastMsgText)

              // para evitar duplicar mensajes
              let i = _.findIndex(MessageServiceProvider.chats, ['id', chat.id]);

              // if (i == -1 || chat.lastMsgTimestamp != MessageServiceProvider.chats[i].lastMsgTimestamp) {
              //   console.log('index', i, chat.lastMsgTimestamp, MessageServiceProvider.chats[i].lastMsgTimestamp)
              //   this.showNotification(chat.name, chat.lastMsgText)
              // }

              if (i != -1) MessageServiceProvider.chats.splice(i, 1);
              MessageServiceProvider.chats.push(chat);
              // para poner los mensajes primeros arriba
              MessageServiceProvider.chats = _.orderBy(
                MessageServiceProvider.chats,
                ['lastMsgTimestamp'], ['desc']);
              this.events.publish('chatList', MessageServiceProvider.chats);
            });
          }
        )
    }
  }


  showNotification(from: string, text: string) {
    this.toastCtrl.create({
      message         : 'Mensaje de ' + from + '\n' + text,
      // duration : 1000,
      position        : 'top',
      cssClass        : 'pushNotification',
      showCloseButton : true
    }).present();
  }


  getFromLocalDataBase() {
    this.settings.getChatList()
      .then(value => {
        MessageServiceProvider.chats = value;
      })
      .then(() => this.events.publish('chatList', MessageServiceProvider.chats))
    ;
  }


  getChat(otherUserId: string) {
    this.dbapi.getChat(otherUserId);
    // this.getChatFromLocalDataBase(otherUserId);
  }

  getChatFromLocalDataBase(otherUserId: string) {
    this.settings.getChat(otherUserId)
      .then(messages => {
        for (let message of messages) {
          console.log('message', message);
          this.events.publish('chat', message);
        }
      })
    ;
  }

  unsuscribeChatList() {
    if (MessageServiceProvider.chatSubscription != null)
      MessageServiceProvider.chatSubscription.unsubscribe();
    MessageServiceProvider.chatSubscription = null;
  }
}
