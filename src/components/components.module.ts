import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { SearchBarComponent } from './SeachBar/SearchBar';
import { ModalComponent } from './modal/modal';
import { CategoryNavComponent } from './category-nav/category-nav';
import {CloudinaryModule} from "@cloudinary/angular-5.x";
import { PopOverComponent } from './pop-over/pop-over';


@NgModule({
	declarations: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent,
    PopOverComponent],
  imports: [IonicModule, CloudinaryModule],
	exports: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent,
    PopOverComponent],
	entryComponents:[ ModalComponent]
})
export class ComponentsModule {}
