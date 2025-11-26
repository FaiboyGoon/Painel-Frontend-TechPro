import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { UsuarioService } from '../../../services/usuario.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../auth/auth.service';
import { Login } from '../../../auth/login';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MdbFormsModule,
    FormsModule,
    RouterLink,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  login: Login = new Login();

  router = inject(Router);
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);

  constructor() {
    this.authService.removerToken();
  }

  logar() {

    this.authService.logar(this.login).subscribe({
      next: (response) => {
        if (response) {
          this.authService.addToken(response.token);
          this.gerarToast().fire({ icon: 'success', title: 'Seja bem-vindo!' });
          //console.log(token);
          this.router.navigate(['/principal/dashboard']);
        }
      },
      error: (err) => {
            Swal.fire('Erro no Login', 'Email ou Senha Incorrectos!', 'error');
        }
      });
  }

  gerarToast() {
    return Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }
}
