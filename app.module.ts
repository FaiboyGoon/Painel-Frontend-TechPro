import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CambiosComponent } from './cambios/cambios.component';
import { ExtratoComponent } from './extrato/extrato.component';

@NgModule({
  declarations: [
    // ... seus componentes
    CambiosComponent,
    ExtratoComponent
  ],
  imports: [
    // ... outros imports
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class AppModule { }
