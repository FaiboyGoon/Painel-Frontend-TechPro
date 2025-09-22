import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/api/dashboard';

  constructor() {}

  obterDashboardAtual(): Observable<any> {
    return this.http.get<any>(this.API);
  }

  obterDashboardMes(ano: number, mes: number): Observable<any> {
    return this.http.get<any>(`${this.API}/mes/${ano}/${mes}`);
  }

  obterDashboardAno(ano: number): Observable<any> {
    return this.http.get<any>(`${this.API}/ano/${ano}`);
  }
}
