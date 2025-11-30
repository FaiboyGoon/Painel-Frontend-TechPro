import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Itemnota } from '../../../models/itemnota';
import { ItemnotaService } from '../../../services/itemnota.service';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { Transacao } from '../../../models/transacao';
import { TransacoesListComponent } from '../../transacoes/transacoes-list/transacoes-list.component';

@Component({
  selector: 'app-itens-form',
  standalone: true,
  imports: [
    MdbFormsModule,
    FormsModule,
    MdbModalModule,
    TransacoesListComponent,
    CommonModule,
  ],
  templateUrl: './itens-form.component.html',
  styleUrl: './itens-form.component.scss',
})
export class ItensFormComponent {
  item!: Itemnota;
  @Output('meuEvento') meuEvento = new EventEmitter();

  rotaActivada = inject(ActivatedRoute);
  roteador = inject(Router);

  childModalRef!: MdbModalRef<any>;
  @ViewChild('modalTransacoesList') modalTransacoesList!: TemplateRef<any>;
  modalService = inject(MdbModalService);

  itemService = inject(ItemnotaService);
  cambioService = inject(CambiohistoricoService);

  taxaCambioAtual: number = 5.8;
  valorTotalCalculado: number = 0;

  constructor(public modalRef: MdbModalRef<ItensFormComponent>) {
    // Recebe os dados passados pelo modal usando o método component
    const modalData = (modalRef as any).data;
    if (modalData && modalData.item) {
      this.item = modalData.item;
    } else {
      // Se não vier dados, cria um item novo
      this.item = new Itemnota();
      this.item.quantidade = 0;
      this.item.valorUnitario = 0;
    }

    this.carregarTaxaCambio();
    this.calcularValorTotal();
  }

  ngOnInit() {
    this.calcularValorTotal();
  }

  carregarTaxaCambio() {
    this.cambioService.atualizarTaxaDia().subscribe({
      next: (taxa: any) => {
        if (typeof taxa === 'number') {
          this.taxaCambioAtual = taxa;
        } else if (taxa && taxa.cambio) {
          this.taxaCambioAtual = taxa.cambio;
        } else if (taxa && taxa.taxaUsdBrl) {
          this.taxaCambioAtual = taxa.taxaUsdBrl;
        }
        console.log('Taxa de câmbio carregada:', this.taxaCambioAtual);
      },
      error: (e) => {
        console.error('Erro ao carregar taxa de câmbio:', e);
      },
    });
  }

  calcularValorTotal() {
    const quantidade = this.item.quantidade || 0;
    const valorUnitario = this.item.valorUnitario || 0;
    this.valorTotalCalculado = quantidade * valorUnitario;
    this.item.valorTotal = this.valorTotalCalculado;
  }

  buscarItemPorId(id: number) {
    this.itemService.buscarItemPorId(id).subscribe({
      next: (retorno) => {
        this.item = retorno;
        this.calcularValorTotal();
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  save() {
    this.calcularValorTotal();

    // Prepara o objeto para enviar ao backend
    const itemParaSalvar: any = {
      id: this.item.id || undefined,
      descricao: this.item.descricao,
      quantidade: this.item.quantidade,
      valorUnitario: this.item.valorUnitario,
      valorTotal: this.item.valorTotal,
      transacao: this.item.transacao ? { id: this.item.transacao.id } : null
    };

    console.log('Enviando para o backend:', itemParaSalvar);

    if (this.item.id > 0) {
      this.itemService.atualizarItem(this.item.id, itemParaSalvar as Itemnota).subscribe({
        next: (resp) => {
          console.log('Resposta do backend:', resp);
          Swal.fire({
            title: 'Item Atualizado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.modalRef.close('saved');
        },
        error: (e) => {
          console.error('Erro ao atualizar:', e);
          Swal.fire({
            title: 'Erro ao atualizar Item',
            text: e.error || e.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      });
    } else {
      this.itemService.criarItem(itemParaSalvar as Itemnota).subscribe({
        next: (resp) => {
          console.log('Item criado com sucesso:', resp);
          Swal.fire({
            title: 'Item Criado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.modalRef.close('saved');
        },
        error: (e) => {
          console.error('Erro ao criar:', e);
          Swal.fire({
            title: 'Erro ao Criar Item',
            text: e.error || e.message,
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        },
      });
    }
  }

  buscarTransacoes() {
    this.childModalRef = this.modalService.open(this.modalTransacoesList, {
      modalClass: 'custom-wide-modal',
    });
  }

  meuEventoTratamento(transacao: Transacao) {
    this.item.transacao = transacao;
    this.childModalRef.close();
  }

  close() {
    this.modalRef.close();
  }
}