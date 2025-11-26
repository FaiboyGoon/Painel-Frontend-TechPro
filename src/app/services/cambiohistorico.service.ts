import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Taxacambio } from '../models/taxacambio';

@Injectable({
  providedIn: 'root',
})
export class CambiohistoricoService {
  http = inject(HttpClient);

  API = 'http://localhost:8080/cambio';

  constructor() {}

  atualizarTaxaDia(): Observable<Taxacambio>{
    return this.http.get<Taxacambio>(this.API + '/atualizar');
  }
  
  buscarUltimaTaxa(): Observable<Taxacambio> {
    return this.http.get<Taxacambio>(this.API + '/taxa-hoje');
  }

  



}
