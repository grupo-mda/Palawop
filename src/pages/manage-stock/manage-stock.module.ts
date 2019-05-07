import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ManageStockPage } from './manage-stock';
import {Ng2CloudinaryModule} from "ng2-cloudinary";

@NgModule({
  declarations: [
    ManageStockPage,
  ],
  imports: [
    IonicPageModule.forChild(ManageStockPage),
    Ng2CloudinaryModule,
  ],
})
export class ManageStockPageModule {}
