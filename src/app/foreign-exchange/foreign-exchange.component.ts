import { Component, OnInit } from '@angular/core';
import { FastForexService } from '../services/fast-forex.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-foreign-exchange',
  templateUrl: './foreign-exchange.component.html',
  styleUrls: ['./foreign-exchange.component.scss']
})
export class ForeignExchangeComponent implements OnInit {

  currencies: any[] = [];
  fromCurrency: any;
  toCurrency: any;
  results?: any[] = [];

  constructor(private fastForexService: FastForexService, private storageService: LocalStorageService) { }

  ngOnInit() {
    this.currencies = this.storageService.retrieve('currencies');
    if (!this.currencies) {
      this.fastForexService.getCurrencies().subscribe((data: any) => {
        let fields = Object.entries(data.currencies);
        this.currencies = fields.map(([key, value]) => ({
          code: key,
          name: value
        }));
        this.storageService.store('currencies', this.currencies);
      });
    }
  }

  calculate() {
    console.log(this.fromCurrency, this.toCurrency);

    this.results = [];
    
    this.fastForexService.getExchangeRate(this.fromCurrency, this.toCurrency).subscribe((data: any) => {
      Object.entries(data.result).map(([key, value]) => {
        this.results?.push({
          currency: key,
          amount: value
        });
      });
    });
  }



}