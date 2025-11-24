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
  email!: '';
  senha!: '';

  router = inject(Router);
  usuarioService = inject(UsuarioService);

  constructor() {}

  logar() {
    this.usuarioService.login(this.email, this.senha).subscribe({
      next: () => {
        this.gerarToast().fire({ icon: 'success', title: 'Seja bem-vindo!' });
        this.router.navigate(['principal/dashboard']);
      },
      error: (err) => {
        Swal.fire('Erro no Login', 'Email ou Senha Incorrectos!', 'error');
      },
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
