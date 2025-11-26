import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TipoUsuario } from '../models/enum';
import { Usuario } from '../models/usuario';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { Login } from './login';

export interface LoginResponse {
  token: string;
  id: number;
  nome: string;
  email: string;
  tipoUsuario: TipoUsuario;
  mensagem: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  private API = 'http://localhost:8080/api/usuarios';

  logar(login: Login): Observable<LoginResponse> {
  return this.http.post<LoginResponse>(`${this.API}/login`, login);
}


  addToken(token: string) {
    localStorage.setItem('token', token);
  }

  removerToken() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  jwtDecode() {
    let token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token);
    }
    return '';
  }

  hasRole(role: string) {
    let user = this.jwtDecode() as Usuario;
    if (user.tipoUsuario == role) return true;
    else return false;
  }

  getUsuarioLogado() {
    return this.jwtDecode() as Usuario;
  }
}
