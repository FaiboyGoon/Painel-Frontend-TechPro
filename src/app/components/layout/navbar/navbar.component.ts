import { Component, inject } from '@angular/core';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { AuthService } from '../../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  authService = inject(AuthService);

  isDemandante(): boolean {
    const user = this.authService.getUsuarioLogado();
    console.log('Usuário logado:', user);
    console.log('Tipo de usuário:', user?.tipoUsuario);
    console.log('É DEMANDANTE?', this.authService.hasRole('DEMANDANTE'));
    return this.authService.hasRole('DEMANDANTE');
  }
}