import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.getUsuarioLogado();
  
  if (user && user.tipoUsuario === 'DEMANDANTE') {
    return true;
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Acesso Negado',
      text: 'Apenas usuários DEMANDANTE podem acessar esta página',
    });
    router.navigate(['/principal/dashboard']);
    return false;
  }
};