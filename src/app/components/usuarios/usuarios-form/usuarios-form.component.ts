import { Component, inject, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TipoUsuario } from '../../../models/enum';

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

  constructor(private router: Router) {
    // Inicializa o tipoUsuario com um valor padrão
    this.usuario.tipoUsuario = TipoUsuario.USUARIO;
  }

  save() {
    // Validação de senha
    if (!this.senha || this.senha.length < 5) {
      Swal.fire('A senha precisa ter no mínimo 5 caracteres!', '', 'error');
      return;
    }

    // Validação de campos obrigatórios
    if (!this.usuario.nome || this.usuario.nome.trim() === '') {
      Swal.fire('Nome é obrigatório!', '', 'error');
      return;
    }

    if (!this.usuario.email || this.usuario.email.trim() === '') {
      Swal.fire('Email é obrigatório!', '', 'error');
      return;
    }

    if (!this.usuario.tipoUsuario) {
      Swal.fire('Tipo de usuário é obrigatório!', '', 'error');
      return;
    }

    // Prepara o objeto para enviar
    const usuarioParaEnviar = {
      nome: this.usuario.nome.trim(),
      email: this.usuario.email.trim(),
      senha: this.senha,
      tipoUsuario: this.usuario.tipoUsuario,
      ativo: true
    };

    console.log('Enviando usuário:', usuarioParaEnviar); // Para debug

    // Save
    this.usuarioService.cadastrar(usuarioParaEnviar as any).subscribe({
      next: (mensagem: any) => {
        Swal.fire({
          title: 'Sucesso!',
          text: mensagem?.mensagem || mensagem?.message || 'Usuário criado com sucesso!',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
        this.roteador.navigate(['login']);
      },
      error: (erro) => {
        console.error('Erro completo:', erro); // Para debug
        
        let mensagemErro = 'Erro ao cadastrar usuário';
        
        if (erro.error?.erro) {
          mensagemErro = erro.error.erro;
        } else if (erro.error?.message) {
          mensagemErro = erro.error.message;
        } else if (erro.message) {
          mensagemErro = erro.message;
        }
        
        Swal.fire({
          title: 'Erro',
          text: mensagemErro,
          icon: 'error',
          confirmButtonText: 'Ok'
        });
      },
    });
  }
}