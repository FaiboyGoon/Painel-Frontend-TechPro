import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Transacao } from '../../../models/transacao';
import { ActivatedRoute, Router } from '@angular/router';
import { TransacaoService } from '../../../services/transacao.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  StatusPagamento,
  TipoPagamento,
  TipoTransacao,
} from '../../../models/enum';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MdbModalModule, MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { Taxacambio } from '../../../models/taxacambio';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';


@Component({
  selector: 'app-transacoes-form',
  standalone: true,
  imports: [FormsModule, MdbFormsModule, CommonModule, ReactiveFormsModule, MdbModalModule],
  templateUrl: './transacoes-form.component.html',
  styleUrl: './transacoes-form.component.scss',
})
export class TransacoesFormComponent {
  @Input('transacao') transacao!: Transacao;
  @Output('meuEvento') meuEvento = new EventEmitter();

  rotaActivada = inject(ActivatedRoute);
  roteador = inject(Router);

  cambioService = inject(CambiohistoricoService);
  transacaoService = inject(TransacaoService);
  modalService = inject(MdbModalService );
  taxaCambio!: Taxacambio;



  tipoTransacoes = [
    { value: TipoTransacao.CREDITO, label: 'Crédito' },
    { value: TipoTransacao.DEBITO, label: 'Débito' },
  ];

  statusPagamentos = [
    { value: StatusPagamento.PENDENTE, label: 'Pendente' },
    { value: StatusPagamento.PAGO, label: 'Pago' },
    { value: StatusPagamento.CANCELADO, label: 'Cancelado' },
    { value: StatusPagamento.VENCIDO, label: 'Vencido' },
  ];

  tipoPagamentos = [
    { value: TipoPagamento.A_VISTA, label: 'À Vista' },
    { value: TipoPagamento.A_PRAZO, label: 'À Prazo' },
    { value: TipoPagamento.PARCELADO, label: 'Parcelado' },
  ];

  constructor(public modalRef: MdbModalRef<TransacoesFormComponent>) {
    let id = this.rotaActivada.snapshot.params['id'];
    if (id) {
      this.buscarTransacaoPorId(id);
    }
    this.atualizarTaxa();
  }

  buscarTransacaoPorId(id: number) {
    this.transacaoService.buscarTransacaoPorId(id).subscribe({
      next: (retorno) => {
        this.transacao = retorno;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  save() {
    //Atualizar
    if (this.transacao.id > 0) {
      this.transacaoService
        .atualizarTransacao(this.transacao.id, this.transacao)
        .subscribe({
          next: () => {
            Swal.fire({
              title: 'Transação Atualizada com Sucesso!',
              icon: 'success',
              confirmButtonText: 'Ok',
            });
            this.roteador.navigate(['principal/transacoes']);
            this.meuEvento.emit('OK');
          },
          error: (e) => {
            Swal.fire('Erro', e.error, 'error');
            this.roteador.navigate(['principal/transacoes']);
            this.meuEvento.emit('OK');
          },
        });
    }
    // Criando uma Nova
    else {
      this.transacao.taxaCambio = this.taxaCambio;
      this.transacaoService.criarTransacao(this.transacao).subscribe({
        next: () => {
          Swal.fire({
            title: 'Transação Criada com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.roteador.navigate(['principal/transacoes']);
          this.meuEvento.emit('OK');
        },
        error: (e) => {
          Swal.fire('Erro', e.error, 'error');
          this.roteador.navigate(['principal/transacoes']);
          this.meuEvento.emit('OK');
        },
      });
    }
  }

  atualizarTaxa(){
    this.cambioService.atualizarTaxaDia().subscribe({
          next: (taxa) => {
            this.taxaCambio = taxa;
            return this.taxaCambio;
          },
          error: (e) =>
            Swal.fire({
              title: 'Erro ao carregar a dashboard atual',
              text: e.error,
              icon: 'error',
              confirmButtonText: 'Ok',
            }),
        });
  }

  close(){
    this.modalRef.close();
  }
}
