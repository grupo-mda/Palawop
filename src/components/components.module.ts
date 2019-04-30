import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { SearchBarComponent } from './SeachBar/SearchBar';
import { ModalComponent } from './modal/modal';
import { CategoryNavComponent } from './category-nav/category-nav';
import {CloudinaryModule} from "@cloudinary/angular-5.x";


@NgModule({
	declarations: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent],
  imports: [IonicModule, CloudinaryModule],
	exports: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent],
	entryComponents:[ ModalComponent]
})
export class ComponentsModule {}
