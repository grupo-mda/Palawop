import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageStockPage } from './manage-stock';

@NgModule({
  declarations: [
    ManageStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageStockPage),
  ],
})
export class ManageStockPageModule {}
