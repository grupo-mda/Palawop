import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageUsersPage } from './manage-users';
import {Ng2CloudinaryModule} from "ng2-cloudinary";

@NgModule({
  declarations: [
    ManageUsersPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageUsersPage),
    Ng2CloudinaryModule,
  ],
})
export class ManageUsersPageModule {}
