import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminToolsPage } from './admin-tools';

@NgModule({
  declarations: [
    AdminToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminToolsPage),
  ],
})
export class AdminToolsPageModule {}
