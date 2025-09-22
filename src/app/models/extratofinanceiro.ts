import Big from "big.js";

export class Extratofinanceiro {
    id!: number;
    data!: Date;
    totalCreditosDolares!: Big;
    totalDebitosDolares!: Big;
    saldoDiaDolares!: Big;
    saldoAcumuladoDolares!: Big;
    dataCriacao!: Date;
    dataAtualizacao!: Date;
}
