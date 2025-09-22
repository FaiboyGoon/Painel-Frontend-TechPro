import {
  Component,
  EventEmitter,
  inject,
  Input,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { Transacao } from '../../../models/transacao';
import { TransacaoService } from '../../../services/transacao.service';
import {
  MdbModalModule,
  MdbModalRef,
  MdbModalService,
} from 'mdb-angular-ui-kit/modal';
import { FormsModule } from '@angular/forms';
import { TransacoesFormComponent } from '../transacoes-form/transacoes-form.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-transacoes-list',
  standalone: true,
  imports: [MdbModalModule, FormsModule, TransacoesFormComponent],
  templateUrl: './transacoes-list.component.html',
  styleUrl: './transacoes-list.component.scss',
})
export class TransacoesListComponent {
  lista: Transacao[] = [];
  pesquisa: string = '';
  resultados: any[] = [];

  @Input('modoModal') modoModal: boolean = false;
  @Output('meuEvento') meuEvento = new EventEmitter();

  transacaoService = inject(TransacaoService);

  transacaoEdit!: Transacao;

  modalService = inject(MdbModalService);
  @ViewChild('modalTransacaoForm') modalTransacaoForm!: TemplateRef<any>;
  modalRef!: MdbModalRef<any>;

  constructor() {
    this.buscarTodasTransacoes();
  }

  buscarTodasTransacoes() {
    this.transacaoService.buscarTodasTransacoes().subscribe({
      next: (listaRetornada) => {
        this.lista = listaRetornada;
      },
      error: (e) => {
        Swal.fire('Erro', e.error, 'error');
      },
    });
  }

  excluirTransacao(transacao: Transacao) {
    Swal.fire({
      title: 'Deseja mesmo deletar este livro?',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      this.transacaoService.excluirTransacao(transacao.id).subscribe({
        next: () => {
          Swal.fire({
            title: 'Transação Criada com Sucesso!',
            icon: 'success',
            confirmButtonText: 'Ok',
          });
          this.buscarTodasTransacoes();
        },
        error: (e) => {
          Swal.fire('Erro', e.error, 'error');
        },
      });
    });
  }

  search() {
    const id = Number(this.pesquisa);
    if (!isNaN(id)) {
      this.transacaoService.buscarTransacaoPorId(id).subscribe((resultado) => {
        this.resultados = resultado ? [resultado] : [];
      });
    }
  }

  new() {
    this.transacaoEdit = new Transacao();
    this.modalRef = this.modalService.open(this.modalTransacaoForm);
  }

  edit(transacao: Transacao) {
    this.transacaoEdit = transacao;
    this.modalRef = this.modalService.open(this.modalTransacaoForm);
  }

  meuEventoTratamento(mensagem: any) {
    this.buscarTodasTransacoes();
    this.modalRef.close;
  }

  selecionar(transacao: Transacao) {
    this.meuEvento.emit(transacao);
  }
}
