import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ExchangeRate {
  from: string;
  to: string;
  rate: number;
}

@Injectable({ providedIn: 'root' })
export class ExchangeService {
  /** URL base construída a partir do environment  */
  private baseUrl = `${environment.apiBase}${environment.exchangePath}`;

  constructor(private http: HttpClient) {}

  /**
   * Busca taxa entre duas moedas.
   * - Exemplo de endpoint esperado: GET {baseUrl}/rate?from=USD&to=BRL
   * - Ajuste a URL se seu backend usar outro padrão.
   */
  getRate(from: string, to: string): Observable<ExchangeRate> {
    const url = `${this.baseUrl}/rate?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    return this.http.get<ExchangeRate>(url);
  }

  /**
   * Lista moedas suportadas.
   * Se seu backend não fornecer, crie um mock local.
   */
  listCurrencies(): Observable<string[]> {
    const url = `${this.baseUrl}/currencies`;
    return this.http.get<string[]>(url);
  }
}
