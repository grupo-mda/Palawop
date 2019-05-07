import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PageFilterPage } from './page-filter';

@NgModule({
  declarations: [
    PageFilterPage,
  ],
  imports: [
    IonicPageModule.forChild(PageFilterPage),
  ],
})
export class PageFilterPageModule {}
