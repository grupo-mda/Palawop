import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { SearchBarComponent } from './SeachBar/SearchBar';
import { ModalComponent } from './modal/modal';
import { CategoryNavComponent } from './category-nav/category-nav';


@NgModule({
	declarations: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent],
	imports: [IonicModule],
	exports: [SearchBarComponent,
		ModalComponent,
    	CategoryNavComponent],
	entryComponents:[ ModalComponent]
})
export class ComponentsModule {}
