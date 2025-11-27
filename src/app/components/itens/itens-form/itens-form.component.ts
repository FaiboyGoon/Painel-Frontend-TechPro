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
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
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
  ],
  templateUrl: './itens-form.component.html',
  styleUrl: './itens-form.component.scss',
})
export class ItensFormComponent {
  @Input('item') item!: Itemnota;
  @Output('meuEvento') meuEvento = new EventEmitter();

  rotaActivada = inject(ActivatedRoute);
  roteador = inject(Router);

  childModalRef!: MdbModalRef<any>;
  @ViewChild('modalTransacoesList') modalTransacoesList!: TemplateRef<any>;
  modalService = inject(MdbModalService);

  itemService = inject(ItemnotaService);

  constructor(public modalRef: MdbModalRef<ItensFormComponent>) {
    let id = this.rotaActivada.snapshot.params['id'];
    if (id) {
      this.buscarItemPorId(id);
    }
  }

  buscarItemPorId(id: number) {
    this.itemService.buscarItemPorId(id).subscribe({
      next: (retorno) => {
        this.item = retorno;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  save() {
    //Atualizar o Item
    if (this.item.id > 0) {
      this.itemService.atualizarItem(this.item.id, this.item).subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Item Criado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.roteador.navigate(['principal/itens']);
          this.meuEvento.emit('OK');
          this.close();
        },
        error: (e) =>
          Swal.fire({
            title: 'Erro ao atualizar Item',
            text: e.error,
            icon: 'error',
            confirmButtonText: 'Ok',
          }),
          
      });
    }
    //Criar um Item Novo
    else {
      this.itemService.criarItem(this.item).subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Item Criado com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.roteador.navigate(['principal/itens']);
          this.meuEvento.emit('OK');
          this.close();
        },
        error: (e) => {
          Swal.fire({
            title: 'Erro ao Criar Item',
            text: e.error,
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

  close(){
    this.modalRef.close();
  }
}
