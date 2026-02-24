import { Component, inject, OnInit } from '@angular/core';
import { ExtratofinanceiroService } from '../../../services/extratofinanceiro.service';
import { CambiohistoricoService } from '../../../services/cambiohistorico.service';
import { Extratofinanceiro } from '../../../models/extratofinanceiro';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

interface ExtratoMensal {
  mes: number;
  totalCreditos: number;
  totalDebitos: number;
  saldoMes: number;
  diasComMovimento: number;
}

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
  extratosAgrupados: ExtratoMensal[] = [];
  resumoMensal: any;
  resumoAnual: any;
  taxaCambioAtual: number = 5.8;

  ano: number = new Date().getFullYear();
  mes: number = new Date().getMonth() + 1;
  data: string = new Date().toISOString().split('T')[0];

  visualizacao: 'mensal' | 'anual' = 'mensal';

  error: string | null = null;

  // Nomes dos meses
  private mesesNomes = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  // Dias da semana
  private diasSemana = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ];

  ngOnInit(): void {
    this.carregarTaxaCambio();
    this.carregarExtratosMes();
    this.carregarResumoMensal();
  }

  carregarTaxaCambio() {
    this.cambioService.atualizarTaxaDia().subscribe({
      next: (taxa: any) => {
        if (typeof taxa === 'number') {
          this.taxaCambioAtual = taxa;
        } else if (taxa && taxa.cambio) {
          this.taxaCambioAtual = taxa.cambio;
        } else if (taxa && taxa.taxaUsdBrl) {
          this.taxaCambioAtual = taxa.taxaUsdBrl;
        }
        console.log('💱 Taxa de câmbio:', this.taxaCambioAtual);
      },
      error: (e) => {
        console.error('❌ Erro ao carregar taxa de câmbio:', e);
      },
    });
  }

  mudarVisualizacao(tipo: 'mensal' | 'anual') {
    this.visualizacao = tipo;
    
    if (tipo === 'mensal') {
      this.carregarExtratosMes();
      this.carregarResumoMensal();
    } else {
      this.carregarExtratosAno();
      this.carregarResumoAnual();
    }
  }

  carregarExtratosMes() {
    this.error = null;

    this.extratoService.buscarExtratosMes(this.ano, this.mes).subscribe({
      next: (dados) => {
        this.extratos = dados;
        console.log('📊 Extratos mensais carregados:', dados.length);
      },
      error: (e) => {
        console.error('❌ Erro ao carregar extratos mensais:', e);
        Swal.fire('Erro', 'Não foi possível carregar os extratos do mês', 'error');
      },
    });
  }

  carregarExtratosAno() {
    this.error = null;

    this.extratoService.buscarExtratosAno(this.ano).subscribe({
      next: (dados) => {
        this.extratos = dados;
        this.agruparExtratosPorMes(dados);
        console.log('📊 Extratos anuais carregados:', dados.length);
      },
      error: (e) => {
        console.error('❌ Erro ao carregar extratos anuais:', e);
        Swal.fire('Erro', 'Não foi possível carregar os extratos do ano', 'error');
      },
    });
  }

  agruparExtratosPorMes(extratos: Extratofinanceiro[]) {
    const mesesMap = new Map<number, ExtratoMensal>();

    // Agrupa por mês
    extratos.forEach(extrato => {
      const data = new Date(extrato.data + 'T00:00:00');
      const mes = data.getMonth() + 1;

      if (!mesesMap.has(mes)) {
        mesesMap.set(mes, {
          mes: mes,
          totalCreditos: 0,
          totalDebitos: 0,
          saldoMes: 0,
          diasComMovimento: 0
        });
      }

      const grupo = mesesMap.get(mes)!;
      grupo.totalCreditos += extrato.totalCreditosDolares;
      grupo.totalDebitos += extrato.totalDebitosDolares;
      grupo.saldoMes += extrato.saldoDiaDolares;
      grupo.diasComMovimento++;
    });

    // Converte para array e ordena por mês
    this.extratosAgrupados = Array.from(mesesMap.values())
      .sort((a, b) => a.mes - b.mes);

    console.log('📈 Extratos agrupados por mês:', this.extratosAgrupados);
  }

  carregarResumoMensal() {
    this.extratoService.obterResumoMensal(this.ano, this.mes).subscribe({
      next: (resumo) => {
        this.resumoMensal = resumo;
        console.log('📈 Resumo mensal:', resumo);
      },
      error: (e) => {
        console.error('❌ Erro ao carregar resumo mensal:', e);
        Swal.fire('Erro', 'Não foi possível carregar o resumo mensal', 'error');
      },
    });
  }

  carregarResumoAnual() {
    this.extratoService.obterResumoAnual(this.ano).subscribe({
      next: (resumo) => {
        this.resumoAnual = resumo;
        console.log('📈 Resumo anual:', resumo);
      },
      error: (e) => {
        console.error('❌ Erro ao carregar resumo anual:', e);
        Swal.fire('Erro', 'Não foi possível carregar o resumo anual', 'error');
      },
    });
  }

  atualizarExtratoDia() {
    this.extratoService.atualizarExtratoDia(this.data).subscribe({
      next: () => {
        Swal.fire('Sucesso', 'Extrato atualizado com sucesso', 'success');
        if (this.visualizacao === 'mensal') {
          this.carregarExtratosMes();
        } else {
          this.carregarExtratosAno();
        }
      },
      error: (e) => {
        console.error('❌ Erro ao atualizar extrato:', e);
        Swal.fire('Erro', 'Não foi possível atualizar o extrato', 'error');
      },
    });
  }

  getMesNome(mes: number): string {
    return this.mesesNomes[mes - 1] || 'Mês Inválido';
  }

  getDiaSemana(data: string | Date): string {
    const date = typeof data === 'string' ? new Date(data + 'T00:00:00') : data;
    return this.diasSemana[date.getDay()];
  }
}