import { Component, inject, OnInit } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule, CommonModule, MdbFormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  dashboardData: any = {};
  anoAtual: number = new Date().getFullYear();
  mesAtual: number = new Date().getMonth() + 1;

  dashboardService = inject(DashboardService);

  constructor() {}

  ngOnInit(): void {
    this.carregarDashboardAtual();
  }

  carregarDashboardAtual(): void {
    this.dashboardService.obterDashboardAtual().subscribe({
      next: (data) => (this.dashboardData = data),
      error: (e) =>
        Swal.fire({
          title: 'Erro ao carregar a dashboard atual',
          text: e.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        }),
    });
  }

  carregarDashboardMes(ano: number, mes: number): void {
    this.dashboardService.obterDashboardMes(ano, mes).subscribe({
      next: (data) => (this.dashboardData = data),
      error: (e) =>
        Swal.fire({
          title: 'Erro ao carregar a dashboard do mês',
          text: e.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        }),
    });
  }

  carregarDashboardAno(ano: number): void {
    this.dashboardService.obterDashboardAno(ano).subscribe({
      next: (data) => (this.dashboardData = data),
      error: (e) =>
        Swal.fire({
          title: 'Erro ao carregar a dashboard do ano',
          text: e.error,
          icon: 'error',
          confirmButtonText: 'Ok',
        }),
    });
  }

  getKeys(obj: any): string[] {
  return obj ? Object.keys(obj) : [];
}

}
