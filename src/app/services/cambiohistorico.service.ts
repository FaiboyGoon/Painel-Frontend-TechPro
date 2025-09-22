import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cambiohistorico } from '../models/cambiohistorico';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CambiohistoricoService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/api/cambio';

  constructor() {}

  salvarTaxaCambio(cambio: Cambiohistorico): Observable<Cambiohistorico> {
    return this.http.post<Cambiohistorico>(this.API, cambio);
  }

  buscarTaxaPorData(data: string): Observable<Cambiohistorico> {
    const params = new HttpParams().set('data', data);
    return this.http.get<Cambiohistorico>(this.API + '/data/' + data, {
      params,
    });
  }

  buscarUltimaTaxa(): Observable<Cambiohistorico> {
    return this.http.get<Cambiohistorico>(this.API + '/ultima');
  }

  buscarTaxaMaisRecenteAteData(data: string): Observable<Cambiohistorico> {
    const params = new HttpParams().set('data', data);
    return this.http.get<Cambiohistorico>(this.API + '/data/' + data, {
      params,
    });
  }

  buscarTaxasPorPeriodo(
    dataInicio: string,
    dataFim: string
  ): Observable<Cambiohistorico[]> {
    const params = new HttpParams()
      .set('dataInicio', dataInicio)
      .set('dataFim', dataFim);

    return this.http.get<Cambiohistorico[]>(`${this.API}/periodo`, { params });
  }

  buscarTaxasMes(ano: number, mes: number): Observable<Cambiohistorico[]> {
    return this.http.get<Cambiohistorico[]>(`${this.API}/mes/${ano}/${mes}`);
  }

  excluirTaxa(id: number): Observable<void> {
    return this.http.delete<void>(this.API + '/' + id);
  }
}
