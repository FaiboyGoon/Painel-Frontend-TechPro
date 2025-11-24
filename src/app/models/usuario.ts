import { TipoUsuario } from './enum';

export class Usuario {
  id?: number;
  nome!: string;
  email!: string;
  senha?: string;
  tipoUsuario!: TipoUsuario;
  ativo!: boolean;
  dataCriacao?: string;       
  dataAtualizacao?: string;   
}
