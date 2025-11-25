import { Routes } from '@angular/router';
import { PrincipalComponent } from './components/layout/principal/principal.component';
import { DashboardComponent } from './components/layout/dashboard/dashboard.component';
import { ItensListComponent } from './components/itens/itens-list/itens-list.component';
import { ItensFormComponent } from './components/itens/itens-form/itens-form.component';
import { TransacoesListComponent } from './components/transacoes/transacoes-list/transacoes-list.component';
import { TransacoesFormComponent } from './components/transacoes/transacoes-form/transacoes-form.component';
import { CambiosListComponent } from './components/cambios/cambios-list/cambios-list.component';
import { CambiosFormComponent } from './components/cambios/cambios-form/cambios-form.component';
import { ExtratosListComponent } from './components/extratos/extratos-list/extratos-list.component';
import { UsuariosFormComponent } from './components/usuarios/usuarios-form/usuarios-form.component';
import { LoginComponent } from './components/layout/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: UsuariosFormComponent },
  {
    path: 'principal',
    component: PrincipalComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'itens', component: ItensListComponent },
      { path: 'itens/new', component: ItensFormComponent },
      { path: 'itens/edit/:id', component: ItensFormComponent },
      { path: 'transacoes', component: TransacoesListComponent },
      { path: 'transacoes/new', component: TransacoesFormComponent },
      { path: 'transacoes/edit/:id', component: TransacoesFormComponent },
      { path: 'cambios', component: CambiosListComponent },
      { path: 'cambios/new', component: CambiosFormComponent },
      { path: 'cambios/edit/:id', component: CambiosFormComponent },
      { path: 'extratos', component: ExtratosListComponent },
      { path: 'usuarios/new', component: UsuariosFormComponent },
    ],
  },
];
