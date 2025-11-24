import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Usuario } from '../models/usuario';
import { TipoUsuario } from '../models/enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/usuarios';

  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) {
    const saved = localStorage.getItem('usuario');
    if (saved) {
      this.usuarioSubject.next(JSON.parse(saved));
    }
  }

  login(credentials: { email: string; senha: string }) {
    return this.http.post<Usuario>(`${this.apiUrl}/login`, credentials).pipe(
      tap((usuario) => {
        this.usuarioSubject.next(usuario);
        localStorage.setItem('usuario', JSON.stringify(usuario));
      })
    );
  }

  logout() {
    this.usuarioSubject.next(null);
    localStorage.removeItem('usuario');
  }

  get usuarioLogado(): Usuario | null {
    return this.usuarioSubject.value;
  }

  get isLogged(): boolean {
    return !!this.usuarioSubject.value;
  }

  /** Headers required by backend */
  getAuthHeaders() {
    const usuario = this.usuarioLogado;

    if (!usuario) return {};

    return {
      'X-Usuario-Id': usuario.id?.toString(),
      'X-Usuario-Tipo': usuario.tipoUsuario
    };
  }
} 