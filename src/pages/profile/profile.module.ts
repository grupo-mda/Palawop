import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProfilePage } from './profile';
import {CloudinaryModule} from "@cloudinary/angular-5.x";

@NgModule({
  declarations: [
    ProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ProfilePage),
    CloudinaryModule,
  ],
})
export class ProfilePageModule {}
