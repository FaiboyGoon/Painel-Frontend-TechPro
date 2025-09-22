import Big from "big.js";
import { Itemnota } from "./itemnota";
import { StatusPagamento, TipoPagamento, TipoTransacao } from "./enum";

export class Transacao {
    id!: number;
    data!: Date;
    caracteristica!: string;
    valorReais!: Big;
    taxaCambio!: Big;
    valorDolares!: Big;
    tipoTransacao!: TipoTransacao;
    statusPagamento!: StatusPagamento;
    tipoPagamento!: TipoPagamento;
    dataCriacao!: Date;
    dataAtualizacao!: Date;
    itens!: Itemnota[];
}
