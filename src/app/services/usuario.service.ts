import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { TipoUsuario } from '../models/enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor() {}

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }
}
