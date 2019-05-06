import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";
import * as _ from 'lodash';

@Injectable()
export class UserSettingsProvider {

  constructor(private storage: Storage) {
    console.log('Hello UserSettingsProvider Provider');
  }

  login(user: any) {
    this.storage.set('user', user);
  }

  logout() {
    this.storage.clear();
  }

  async getCurrentUser() {
    return this.storage.get('user');
  }

  async getChatList() {
    let chatList = [];
    await this.storage.forEach((value, key, index) => {
      if (key.startsWith('preview:')) {
        chatList.push(value)
      }
    });

    return _.orderBy(
      chatList,
      ['lastMsgTimestamp'], ['desc']);
  }

  async getChat(otherUserId: string) {
    let chat = [];
    await this.storage.forEach((value: string, key, index) => {
      if (key.startsWith(`message:${otherUserId}`)) {
        let id = key.substring(key.lastIndexOf(':') + 1);
        chat.push(_.assign(value, {'id': id}))
      }
    });

    return _.orderBy(
      chat,
      ['timestamp'], ['asc']);
  }


  saveChatList(chat: any) {
    this.storage.set('preview:' + chat.id, chat);
  }


  saveMessage(otherUserId: string, msg: any) {
    if (typeof msg.val() !== "boolean") {

      let key = 'message:' + otherUserId + ':' + msg.key;

      this.storage.get(key)
        .then(data => {
          if (!data) this.storage.set(key, msg.val());
        });
    }
  }


  removeChat(id: string) {
    this.storage.forEach((value: string, key, index) => {
      if (key.startsWith(`message:${id}`) || key.startsWith(`preview:${id}`)) this.removeMessage(key)
    });
  }


  removeMessage(id: string, idUser?: string, idMessage?: string) {
    if (id == null) id = 'message:' + idUser + ':' + idMessage;
    this.storage.remove(id);

  }
}
