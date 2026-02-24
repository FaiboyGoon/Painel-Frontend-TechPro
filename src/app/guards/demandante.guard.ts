import { Injectable, inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DemandanteGuard implements CanActivate {
  
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    
    // Verifica se o usuário está logado
    const usuario = this.authService.getUsuarioLogado();
    
    if (!usuario) {
      Swal.fire('Acesso Negado', 'Você precisa estar logado', 'error');
      this.router.navigate(['/login']);
      return false;
    }

    // Verifica se é DEMANDANTE
    if (usuario.tipoUsuario !== 'DEMANDANTE') {
      Swal.fire(
        'Acesso Negado', 
        'Esta página é restrita para demandantes', 
        'error'
      );
      this.router.navigate(['/principal/dashboard']);
      return false;
    }

    return true;
  }
}