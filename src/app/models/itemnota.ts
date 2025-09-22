import Big from "big.js";
import { Transacao } from "./transacao";

export class Itemnota {
    id!: number;
    descricao!: string;
    quantidade!: number;
    valorUnitario!: Big;
    valorTotal!: Big;
    transacao!: Transacao;
}
