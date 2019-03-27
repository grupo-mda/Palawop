import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageUserStockPage } from './manage-user-stock';

@NgModule({
  declarations: [
    ManageUserStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageUserStockPage),
  ],
})
export class ManageUserStockPageModule {}
