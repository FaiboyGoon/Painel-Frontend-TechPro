import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
/*
  let authService = inject(AuthService);
  let router = inject(Router);

  if(authService.hasRole("USUARIO") && state.url == '/principal/usuarios' || state.url == '/principal/usuarios/new'){
    Swal.fire({
      title: "Permissão Negada",
      text: "Você não tem permissão para acessar este conteúdo",
      icon: "error"
    });
    router.navigate(['/principal/dashboard']);
    return false;
    
  }
  */
  return true;
};
