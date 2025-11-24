    // Enums
export enum StatusPagamento {
  PENDENTE = "PENDENTE",
  PAGO = "PAGO",
  CANCELADO = "CANCELADO",
  VENCIDO = "VENCIDO"
}

export enum TipoPagamento {
  A_VISTA = "A_VISTA",
  A_PRAZO = "A_PRAZO",
  PARCELADO = "PARCELADO"
}

export enum TipoTransacao {
  CREDITO = "CREDITO",
  DEBITO = "DEBITO"
}

export enum TipoUsuario {
  DEMANDANTE = "DEMANDANTE",
  USUARIO = "USUARIO"
}

// Descrições para uso nos components
export const StatusPagamentoDescricao: Record<StatusPagamento, string> = {
  [StatusPagamento.PENDENTE]: "Pendente",
  [StatusPagamento.PAGO]: "Pago",
  [StatusPagamento.CANCELADO]: "Cancelado",
  [StatusPagamento.VENCIDO]: "Vencido"
};

export const TipoPagamentoDescricao: Record<TipoPagamento, string> = {
  [TipoPagamento.A_VISTA]: "À Vista",
  [TipoPagamento.A_PRAZO]: "À Prazo",
  [TipoPagamento.PARCELADO]: "Parcelado"
};

export const TipoTransacaoDescricao: Record<TipoTransacao, string> = {
  [TipoTransacao.CREDITO]: "Crédito",
  [TipoTransacao.DEBITO]: "Débito"
};

export const TipoUsuarioDescricao: Record<TipoUsuario, string> = {
  [TipoUsuario.DEMANDANTE]: "Demandante",
  [TipoUsuario.USUARIO]: "Usuário"
};

