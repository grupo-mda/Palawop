import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageProfilePage } from './manage-profile';

@NgModule({
  declarations: [
    ManageProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(ManageProfilePage),
  ],
})
export class ManageProfilePageModule {}
