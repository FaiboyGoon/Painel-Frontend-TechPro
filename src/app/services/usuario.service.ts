import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { TipoUsuario } from '../models/enum';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  // Helpers to attach headers
  private headers(tipo?: TipoUsuario, idUsuario?: number): HttpHeaders {
    let h = new HttpHeaders();

    if (tipo) {
      h = h.set('X-Usuario-Tipo', tipo);
    }
    if (idUsuario != null) {
  h = h.set('X-Usuario-Id', String(idUsuario));
}

    return h;
  }

  cadastrar(usuario: Usuario): Observable<any> {
    return this.http.post(`${this.apiUrl}/cadastrar`, usuario);
  }

  login(email: string, senha: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, senha });
  }

  listar(tipoUsuario: TipoUsuario): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.apiUrl}`, {
      headers: this.headers(tipoUsuario)
    });
  }

  buscarPorId(
    id: number,
    tipoUsuario: TipoUsuario,
    idUsuarioLogado: number
  ): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`, {
      headers: this.headers(tipoUsuario, idUsuarioLogado)
    });
  }

  atualizar(
    id: number,
    usuario: Usuario,
    tipoUsuario: TipoUsuario,
    idUsuarioLogado: number
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario, {
      headers: this.headers(tipoUsuario, idUsuarioLogado)
    });
  }

  excluir(id: number, tipoUsuario: TipoUsuario): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      headers: this.headers(tipoUsuario)
    });
  }

  desativar(id: number, tipoUsuario: TipoUsuario): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/desativar`, {}, {
      headers: this.headers(tipoUsuario)
    });
  }

  reativar(id: number, tipoUsuario: TipoUsuario): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/reativar`, {}, {
      headers: this.headers(tipoUsuario)
    });
  }
}
