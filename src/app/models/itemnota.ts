import { Transacao } from './transacao';

export class Itemnota {
  id!: number;
  descricao!: string;
  quantidade!: number;
  valorUnitario!: number;
  valorTotal!: number;
  transacao!: Transacao;
}
