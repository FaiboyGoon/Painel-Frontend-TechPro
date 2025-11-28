import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoUsuario, TipoUsuarioDescricao } from '../../../models/enum';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './usuarios-form.component.html',
  styleUrl: './usuarios-form.component.scss',
})
export class UsuariosFormComponent {
  usuario: Usuario = new Usuario();
  senha: string = '';

  get isPagCadastro(): boolean {
    return this.router.url.includes('new');
  }

  tipoUsuarioList = [
    { value: TipoUsuario.DEMANDANTE, label: 'Demandante' },
    { value: TipoUsuario.USUARIO, label: 'Usuário' },
  ];

  rotaAtivida = inject(ActivatedRoute);
  roteador = inject(Router);
  usuarioService = inject(UsuarioService);
  authService = inject(AuthService);

  constructor(private router: Router) {}

  save() {
    if (this.senha.length < 5) {
      Swal.fire('A senha precisa ter no mínimo 5 caracteres!', '', 'error');
      return;
    }

    this.usuario.senha = this.senha;
    if(!this.usuario.tipoUsuario){
      this.usuario.tipoUsuario = TipoUsuario.USUARIO;
    }else{

    //Save
    this.usuarioService.cadastrar(this.usuario).subscribe({
      next: (mensagem: any) => {
        Swal.fire(
          mensagem?.message || 'Usuário criado com sucesso!',
          '',
          'success'
        );
        this.roteador.navigate(['login']);
      },
      error: (err) => {
        Swal.fire('Erro', err.message, 'error');
      },
    });
  }
}
}
