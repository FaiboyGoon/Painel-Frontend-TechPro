import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExchangeService, ExchangeRate } from '../services/exchange.service';

/**
 * Componente de conversão de moedas.
 * Seleciona moeda origem/destino, quantidade -> exibe resultado.
 */
@Component({
  selector: 'app-cambios',
  templateUrl: './cambios.component.html',
  styleUrls: ['./cambios.component.scss']
})
export class CambiosComponent implements OnInit {
  form: FormGroup;
  currencies: string[] = [];
  rate?: ExchangeRate;
  result?: number;
  loading = false;
  error?: string;

  constructor(private fb: FormBuilder, private exchange: ExchangeService) {
    this.form = this.fb.group({
      from: ['USD'],
      to: ['BRL'],
      amount: [1]
    });
  }

  ngOnInit(): void {
    this.exchange.listCurrencies().subscribe({
      next: list => this.currencies = list,
      error: () => {
        // fallback: caso a API não retorne, manter duas moedas padrão
        this.currencies = ['USD','BRL'];
      }
    });
  }

  /** Chama API para obter taxa e calcula o resultado */
  getRateAndConvert(): void {
    this.error = undefined;
    this.rate = undefined;
    this.result = undefined;

    const { from, to, amount } = this.form.value;

    if (!from || !to) { this.error = 'Selecione moedas válidas'; return; }
    if (from === to) { this.rate = { from, to, rate: 1 }; this.result = Number(amount); return; }

    this.loading = true;
    this.exchange.getRate(from, to).subscribe({
      next: (r) => {
        this.rate = r;
        this.result = Number(amount) * r.rate;
        this.loading = false;
      },
      error: () => {
        this.error = 'Erro ao obter taxa de câmbio';
        this.loading = false;
      }
    });
  }
}
