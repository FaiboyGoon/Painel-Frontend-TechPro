import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionsService, Transaction } from '../services/transactions.service';

/**
 * Componente de extrato:
 * - Carrega transações
 * - Filtra por data e tipo
 * - Ordena por data (mais recente primeiro)
 */
@Component({
  selector: 'app-extrato',
  templateUrl: './extrato.component.html',
  styleUrls: ['./extrato.component.scss']
})
export class ExtratoComponent implements OnInit {
  transactions: Transaction[] = [];
  filtered: Transaction[] = [];
  form: FormGroup;
  loading = false;

  constructor(private svc: TransactionsService, private fb: FormBuilder) {
    this.form = this.fb.group({
      from: [''],
      to: [''],
      type: ['all']
    });
  }

  ngOnInit(): void {
    this.load();
    this.form.valueChanges.subscribe(() => this.applyFilter());
  }

  load(): void {
    this.loading = true;
    this.svc.listTransactions().subscribe({
      next: list => {
        this.transactions = list.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        this.applyFilter();
        this.loading = false;
      },
      error: err => {
        console.error('Erro carregando transações', err);
        this.transactions = [];
        this.filtered = [];
        this.loading = false;
      }
    });
  }

  applyFilter(): void {
    const { from, to, type } = this.form.value;
    let f = [...this.transactions];

    if (type && type !== 'all') f = f.filter(t => t.type === type);
    if (from) {
      const fromDate = new Date(from);
      f = f.filter(t => new Date(t.date) >= fromDate);
    }
    if (to) {
      const toDate = new Date(to);
      toDate.setHours(23,59,59,999);
      f = f.filter(t => new Date(t.date) <= toDate);
    }
    this.filtered = f;
  }
}
