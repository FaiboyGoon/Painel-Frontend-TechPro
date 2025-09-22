import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Transacao } from '../models/transacao';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TransacaoService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/api/transacoes';

  constructor() {}

  criarTransacao(transacao: Transacao): Observable<Transacao> {
    return this.http.post<Transacao>(this.API, transacao);
  }

  criarTransacaoComItens(request: {
    transacao: Transacao;
    itens: any[];
  }): Observable<Transacao> {
    return this.http.post<Transacao>(`${this.API}/com-itens`, request);
  }

  buscarTodasTransacoes(): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(this.API);
  }

  buscarTransacaoPorId(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.API}/${id}`);
  }

  buscarTransacaoComItens(id: number): Observable<Transacao> {
    return this.http.get<Transacao>(`${this.API}/${id}/com-itens`);
  }

  buscarTransacoesPorPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<Transacao[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);
    return this.http.get<Transacao[]>(`${this.API}/periodo`, { params });
  }

  buscarTransacoesMes(ano: number, mes: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(`${this.API}/mes/${ano}/${mes}`);
  }

  buscarDebitosAPrazoMes(ano: number, mes: number): Observable<Transacao[]> {
    return this.http.get<Transacao[]>(
      `${this.API}/debitos-prazo/${ano}/${mes}`
    );
  }

  atualizarTransacao(id: number, transacao: Transacao): Observable<Transacao> {
    return this.http.put<Transacao>(`${this.API}/${id}`, transacao);
  }

  excluirTransacao(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }
}
