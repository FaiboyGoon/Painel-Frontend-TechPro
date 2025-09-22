import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Itemnota } from '../models/itemnota';

@Injectable({
  providedIn: 'root',
})
export class ItemnotaService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/api/itens-nota';

  constructor() {}

  buscarItensPorTransacao(transacaoId: number): Observable<Itemnota[]> {
    return this.http.get<Itemnota[]>(`${this.API}/transacao/${transacaoId}`);
  }

  buscarItemPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.API}/${id}`);
  }

  criarItem(item: Itemnota): Observable<any> {
    return this.http.post<any>(this.API, item);
  }

  atualizarItem(id: number, item: Itemnota): Observable<any> {
    return this.http.put<any>(`${this.API}/${id}`, item);
  }

  excluirItem(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API}/${id}`);
  }

  buscarItensPorDescricao(descricao: string): Observable<Itemnota[]> {
    const params = new HttpParams().set('descricao', descricao);
    return this.http.get<Itemnota[]>(`${this.API}/buscar`, { params });
  }
}
