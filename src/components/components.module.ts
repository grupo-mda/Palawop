import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { SearchBarComponent } from './SeachBar/SearchBar';
import { ModalComponent } from './modal/modal';


@NgModule({
	declarations: [SearchBarComponent,ModalComponent],
	imports: [IonicModule],
	exports: [SearchBarComponent,
	ModalComponent],
	entryComponents:[ ModalComponent]
})
export class ComponentsModule {}
