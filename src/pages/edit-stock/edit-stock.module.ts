import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditStockPage } from './edit-stock';

@NgModule({
  declarations: [
    EditStockPage,
  ],
  imports: [
    IonicPageModule.forChild(EditStockPage),
  ],
})
export class EditStockPageModule {}
