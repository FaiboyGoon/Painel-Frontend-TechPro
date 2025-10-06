import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ItensFormComponent } from '../itens-form/itens-form.component';
import { Itemnota } from '../../../models/itemnota';
import { ItemnotaService } from '../../../services/itemnota.service';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from 'chart.js';

@Component({
  selector: 'app-itens-list',
  standalone: true,
  imports: [ItensFormComponent, MdbModalModule, FormsModule],
  templateUrl: './itens-list.component.html',
  styleUrl: './itens-list.component.scss',
})
export class ItensListComponent {
  @Input('modoModal') modoModal: boolean = false;
  @Output('meuEvento') meuEvento = new EventEmitter();

  lista: Itemnota[] = [];
  itemEdit!: Itemnota;
  pesquisa: string = '';
  tipoPesquisa: 'id' | 'descricao' = 'descricao';

  modalService = inject(MdbModalService);
  @ViewChild('modalItemForm') modalItemForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  itemService = inject(ItemnotaService);

  constructor() {
    this.buscarTodosItens();
  }

  buscarTodosItens() {
    this.itemService.buscarTodosItens().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  search() {
    switch (this.tipoPesquisa) {
      case 'id':
        const id = Number(this.pesquisa);
        if (!isNaN(id)) {
          this.itemService.buscarItemPorId(id).subscribe((lista) => {
            this.lista = lista ? [lista] : [];
          });
        }

        break;

      case 'descricao':
        this.itemService
          .buscarItensPorDescricao(this.pesquisa)
          .subscribe((lista) => {
            this.lista = lista;
          });
        break;

      default:
        Swal.fire({
          title: 'Pesquisa Inválida',
          text: 'Tente Novamente!',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
    }
  }

  new() {
    this.itemEdit = new Itemnota();
    this.modalRef = this.modalService.open(this.modalItemForm);
  }

  edit(item: Itemnota) {
    this.itemEdit = item;
    this.modalRef = this.modalService.open(this.modalItemForm);
  }

  meuEventoTratamento(mensagem: any) {
    this.modalRef.close();
  }

  selecionar(item: Itemnota) {
    this.meuEvento.emit(item);
  }

  excluirItem(item: Itemnota) {
    Swal.fire({
      title: 'Deseja mesmo deletar este item?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.itemService.excluirItem(item.id).subscribe({
          next: () => {
            Swal.fire({
              title: 'Item excluído com sucesso',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.buscarTodosItens();
          },
          error: () => {
            Swal.fire({
              icon: 'error',
              title: 'Erro ao Excluir Item',
              confirmButtonText: 'OK',
            });
            this.buscarTodosItens();
          },
        });
      }
    });
  }
}
