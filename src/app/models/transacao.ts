import { Itemnota } from './itemnota';
import { StatusPagamento, TipoPagamento, TipoTransacao } from './enum';
import { Taxacambio } from './taxacambio';

export class Transacao {
  id!: number;
  data!: Date;
  caracteristica!: string;
  valorReais!: number;
  taxaCambio!: number | Taxacambio;
  valorDolares!: number;
  tipoTransacao!: TipoTransacao;
  statusPagamento!: StatusPagamento;
  tipoPagamento!: TipoPagamento;
  dataCriacao!: Date;
  dataAtualizacao!: Date;
  itens!: Itemnota[];
}