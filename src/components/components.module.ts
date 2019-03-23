import { NgModule } from '@angular/core';
import { IonicModule} from 'ionic-angular';
import { SearchBarComponent } from './SeachBar/SearchBar';


@NgModule({
	declarations: [SearchBarComponent],
	imports: [IonicModule],
	exports: [SearchBarComponent]
})
export class ComponentsModule {}
