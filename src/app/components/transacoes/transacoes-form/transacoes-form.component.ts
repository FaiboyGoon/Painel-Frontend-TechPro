import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Transacao } from '../../../models/transacao';
import { ActivatedRoute, Router } from '@angular/router';
import { TransacaoService } from '../../../services/transacao.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StatusPagamento, TipoPagamento, TipoTransacao, } from '../../../models/enum';
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
  modalService = inject(MdbModalService);

  taxaCambio!: Taxacambio;
  moedaSelecionada: string = 'BRL';
  valorEntrada: number = 0;

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

  moedas = [
    { value: 'BRL', label: 'Real (R$)' },
    { value: 'USD', label: 'Dólar (US$)' },
  ];

  obterValorEmReais(): number {
    if (this.valorEntrada === undefined || this.valorEntrada === null) {
      return 0;
    }
    
    if (!this.taxaCambio || this.taxaCambio.cambio === undefined || this.taxaCambio.cambio === 0) {
      return this.moedaSelecionada === 'BRL' ? this.valorEntrada : 0;
    }
    
    if (this.moedaSelecionada === 'USD') {
      return this.valorEntrada * this.taxaCambio.cambio;
    }
    
    return this.valorEntrada;
  }

  obterValorEmDolares(): number {
    if (this.valorEntrada === undefined || this.valorEntrada === null) {
      return 0;
    }
    
    if (!this.taxaCambio || this.taxaCambio.cambio === undefined || this.taxaCambio.cambio === 0) {
      return this.moedaSelecionada === 'USD' ? this.valorEntrada : 0;
    }
    
    if (this.moedaSelecionada === 'BRL') {
      return this.valorEntrada / this.taxaCambio.cambio;
    }
    
    return this.valorEntrada;
  }

  constructor(public modalRef: MdbModalRef<TransacoesFormComponent>) {
    this.atualizarTaxaInicial();

    let id = this.rotaActivada.snapshot.params['id'];
    if (id) {
      this.buscarTransacaoPorId(id);
    }
  }

  atualizarTaxaInicial() {
    this.cambioService.atualizarTaxaDia().subscribe({
      next: (taxa: any) => {
        console.log('Resposta da API:', taxa);
        
        if (typeof taxa === 'number') {
          this.taxaCambio = { cambio: taxa };
          console.log('Taxa carregada (número):', this.taxaCambio);
        } 
        else if (taxa && taxa.cambio) {
          this.taxaCambio = taxa;
          console.log('Taxa carregada (objeto):', this.taxaCambio);
        }
        else if (taxa && taxa.taxaUsdBrl) {
          this.taxaCambio = { cambio: taxa.taxaUsdBrl };
          console.log('Taxa carregada (taxaUsdBrl):', this.taxaCambio);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar taxa:', e);
        Swal.fire({
          title: 'Erro ao carregar a taxa de câmbio',
          text: e.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  forcarAtualizacao() {
    this.obterValorEmReais();
    this.obterValorEmDolares();
  }

  buscarTransacaoPorId(id: number) {
    this.transacaoService.buscarTransacaoPorId(id).subscribe({
      next: (retorno) => {
        this.transacao = retorno;
        this.valorEntrada = this.transacao.valorReais;
        this.moedaSelecionada = 'BRL';
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  save() {
    // Calcula os valores
    if (this.moedaSelecionada === 'USD') {
      this.transacao.valorDolares = this.valorEntrada;
      this.transacao.valorReais = this.valorEntrada * this.taxaCambio.cambio;
    } else {
      this.transacao.valorReais = this.valorEntrada;
      this.transacao.valorDolares = this.valorEntrada / this.taxaCambio.cambio;
    }

    // CORREÇÃO: Cria um objeto para enviar com taxaCambio como número
    const transacaoParaEnviar = {
      ...this.transacao,
      taxaCambio: this.taxaCambio.cambio
    };

    if (this.transacao.id > 0) {
      this.transacaoService
        .atualizarTransacao(this.transacao.id, transacaoParaEnviar as any)
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
    else {
      this.transacaoService.criarTransacao(transacaoParaEnviar as any).subscribe({
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

  atualizarTaxa() {
    this.cambioService.atualizarTaxaDia().subscribe({
      next: (taxa: any) => {
        console.log('Resposta da API:', taxa);
        
        if (typeof taxa === 'number') {
          this.taxaCambio = { cambio: taxa };
          console.log('Taxa atualizada (número):', this.taxaCambio);
        } 
        else if (taxa && taxa.cambio) {
          this.taxaCambio = taxa;
          console.log('Taxa atualizada (objeto):', this.taxaCambio);
        }
        else if (taxa && taxa.taxaUsdBrl) {
          this.taxaCambio = { cambio: taxa.taxaUsdBrl };
          console.log('Taxa atualizada (taxaUsdBrl):', this.taxaCambio);
        }
      },
      error: (e) => {
        console.error('Erro ao carregar taxa:', e);
        Swal.fire({
          title: 'Erro ao carregar a taxa de câmbio',
          text: e.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  close() {
    this.modalRef.close();
  }
}