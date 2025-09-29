import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  balance?: number;
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  private baseUrl = `${environment.apiBase}${environment.transactionsPath}`;

  constructor(private http: HttpClient) {}

  /**
   * Obtém lista de transações.
   * - Espera endpoint: GET {baseUrl}  (ou {baseUrl}/list)
   * - Ajustar se o backend usar paginação / parâmetros.
   */
  listTransactions(): Observable<Transaction[]> {
    const url = `${this.baseUrl}`;
    return this.http.get<Transaction[]>(url);
  }

  // Caso o backend tenha filtros/pagination, adicione métodos extras aqui.
}
    
