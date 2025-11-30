import { Component, inject, OnInit } from '@angular/core';
import { ExtratofinanceiroService } from '../../../services/extratofinanceiro.service';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';
import { Extratofinanceiro } from '../../../models/extratofinanceiro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-extratos-list',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './extratos-list.component.html',
  styleUrl: './extratos-list.component.scss',
})
export class ExtratosListComponent implements OnInit {
  private extratoService = inject(ExtratofinanceiroService);
  private cambioService = inject(CambiohistoricoService);

  extratos: Extratofinanceiro[] = [];
  resumoMensal: any;
  resumoAnual: any;
  taxaCambioAtual: number = 5.8; // Valor padrão

  ano: number = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;
  data: string = new Date().toISOString().split('T')[0];

  error: string | null = null;

  ngOnInit(): void {
    this.carregarTaxaCambio();
    this.carregarExtratosMes();
    this.carregarResumoMensal();
  }

  carregarTaxaCambio() {
    this.cambioService.atualizarTaxaDia().subscribe({
      next: (taxa: any) => {
        // Trata diferentes formatos de resposta da API
        if (typeof taxa === 'number') {
          this.taxaCambioAtual = taxa;
        } else if (taxa && taxa.cambio) {
          this.taxaCambioAtual = taxa.cambio;
        } else if (taxa && taxa.taxaUsdBrl) {
          this.taxaCambioAtual = taxa.taxaUsdBrl;
        }
        console.log('Taxa de câmbio carregada:', this.taxaCambioAtual);
      },
      error: (e) => {
        console.error('Erro ao carregar taxa de câmbio:', e);
        // Mantém o valor padrão em caso de erro
      },
    });
  }

  carregarExtratosMes() {
    this.error = null;

    this.extratoService.buscarExtratosMes(this.ano, this.mes).subscribe({
      next: (dados) => {
        this.extratos = dados;
      },
      error: (e) => {
        Swal.fire('Erro ao buscar extratos do Mês', e.error, 'error');
      },
    });
  }

  carregarResumoMensal() {
    this.extratoService.obterResumoMensal(this.ano, this.mes).subscribe({
      next: (resumo) => (this.resumoMensal = resumo),
      error: (e) => {
        Swal.fire('Erro ao buscar resumo do Mês', e.error, 'error');
      },
    });
  }

  carregarResumoAnual() {
    this.extratoService.obterResumoAnual(this.ano).subscribe({
      next: (resumo) => (this.resumoAnual = resumo),
      error: (e) => {
        Swal.fire('Erro ao buscar extratos do Ano', e.error, 'error');
      },
    });
  }

  atualizarExtratoDia() {
    this.extratoService.atualizarExtratoDia(this.data).subscribe({
      next: () => this.carregarExtratosMes(),
      error: (e) => {
        Swal.fire('Erro ao buscar extratos do dia', e.error, 'error');
      },
    });
  }
}