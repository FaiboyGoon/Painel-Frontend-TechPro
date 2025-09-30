import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Cambiohistorico } from '../../../models/cambiohistorico';
import { FormGroup, FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';
import Swal from 'sweetalert2';
import Big from 'big.js';

@Component({
  selector: 'app-cambios-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, CommonModule],
  templateUrl: './cambios-form.component.html',
  styleUrl: './cambios-form.component.scss',
})
export class CambiosFormComponent {
  @Output('meuEvento') meuEvento = new EventEmitter();

  cambio: Cambiohistorico = {
    id: 0,
    data: new Date(),
    taxaUsdBrl: 0,
    dataCriacao: new Date(),
  };

  rotaActivada = inject(ActivatedRoute);
  roteador = inject(Router);

  cambioService = inject(CambiohistoricoService);

  constructor() {}

  save() {
    this.cambioService.salvarTaxaCambio(this.cambio).subscribe({
      next: () => {
        Swal.fire({
          title: 'Câmbio Criado com Sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok',
        });
        this.roteador.navigate(['principal/cambios']);
        this.meuEvento.emit('OK');
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
        this.roteador.navigate(['principal/cambios']);
        this.meuEvento.emit('OK');
      },
    });
  }
}
