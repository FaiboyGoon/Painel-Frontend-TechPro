import { Component, inject, TemplateRef, ViewChild } from '@angular/core';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { CambiosFormComponent } from '../cambios-form/cambios-form.component';
import { Cambiohistorico } from '../../../models/cambiohistorico';
import Swal from 'sweetalert2';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cambios-list',
  standalone: true,
  imports: [CambiosFormComponent, CommonModule, MdbModalModule],
  templateUrl: './cambios-list.component.html',
  styleUrl: './cambios-list.component.scss',
})
export class CambiosListComponent {
  lista: Cambiohistorico[] = [];
  ultimaTaxa?: Cambiohistorico;

  cambioService = inject(CambiohistoricoService);

  constructor() {
    this.buscarUltima();
  }

  modalService = inject(MdbModalService);
  @ViewChild('modalCambioForm') modalCambioForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  buscarUltima() {
    this.cambioService.buscarUltimaTaxa().subscribe({
      next: (resultado) => {
        this.ultimaTaxa = resultado;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  buscarPorData(data: string) {
    this.cambioService.buscarTaxaPorData(data).subscribe({
      next: (resultado) => {
        this.lista = [resultado];
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  buscarPorPeriodo(inicio: string, fim: string) {
    this.cambioService.buscarTaxasPorPeriodo(inicio, fim).subscribe({
      next: (resultado) => {
        this.lista = resultado;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  buscarPorMes(ano: string | number, mes: string | number) {
    let anoNum = Number(ano);
    let mesNum = Number(mes);

    this.cambioService.buscarTaxasMes(anoNum, mesNum).subscribe({
      next: (resultado) => {
        this.lista = resultado;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  excluirTaxa(cambio: Cambiohistorico) {
    Swal.fire({
      title: 'Deseja mesmo deletar este livro?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((resultado) => {
      this.cambioService.excluirTaxa(cambio.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Câmbio excluído com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
        },
        error: (e) => {
          Swal.fire('Erro', e.error, 'error');
        },
      });
    });
  }

  new() {
    this.modalRef = this.modalService.open(this.modalCambioForm);
  }

  meuEventoTratamento(mensagem: any) {
    this.modalRef.close;
  }
}
