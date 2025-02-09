import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAccount, IInvest } from 'src/app/entities/interfaces';
import { InvestmentManagerService } from 'src/app/services/investment-manager.service';
import { FastForexService } from 'src/app/services/fast-forex.service';


@Component({
  selector: 'app-add-investment-modal',
  templateUrl: './add-investment-modal.component.html',
  styleUrls: ['./add-investment-modal.component.scss'],
})
export class AddInvestmentModalComponent {
  @Input() accounts: IAccount[] = [];
  @Input() reloadInvestments: Function = () => {};

  newInvestment: IInvest = {
    investmentId: '',
    accountId: '',
    balance: 0,
    transactions: [],
    investRate: 0,
    growth: 0,
    currency: 'MXN'
  };

  currencies: any[] = [];
  selectedCurrency: string = 'MXN';

  constructor(public activeModal: NgbActiveModal, private investmentService: InvestmentManagerService, private fastForexService: FastForexService) {}

  ngOnInit() {
    this.fastForexService.getCurrencies().subscribe((data: any) => {
      this.currencies = Object.keys(data.currencies).map(key => ({
        code: key,
        name: data.currencies[key]
      }));
    });
  }
  

  addInvestment(): void {
    if (!this.newInvestment.accountId || this.newInvestment.balance <= 0 || this.newInvestment.investRate <= 0) {
      alert('Todos los campos son obligatorios y deben ser válidos.');
      return;
    }
/*
    const newInvestment: IInvest = {
      investmentId: `INV${Date.now()}`,
      accountId: this.newInvestment.accountId,
      balance: this.newInvestment.balance,
      transactions: [],
      investRate: this.newInvestment.investRate,
      growth: 0,
    };

    this.investmentService.addInvestment(newInvestment);
    this.reloadInvestments();
    this.activeModal.close();*/
    
    this.convertBalanceToCurrency(this.newInvestment.balance, this.selectedCurrency).then((convertedBalance) => {
      const newInvestment: IInvest = {
        investmentId: `INV${Date.now()}`,
        accountId: this.newInvestment.accountId,
        balance: convertedBalance,
        transactions: [],
        investRate: this.newInvestment.investRate,
        growth: 0,
        currency: this.selectedCurrency
      };

      this.investmentService.addInvestment(newInvestment);
      this.reloadInvestments();
      this.activeModal.close();
    });

  }


  async convertBalanceToCurrency(balance: number, targetCurrency: string): Promise<number> {
    if (targetCurrency === 'MXN') return balance;
  
    try {
      // Tasa de cambio de la API
      const rateData: any = await this.fastForexService.getExchangeRate('USD', targetCurrency).toPromise();
  
      if (rateData && rateData.result && rateData.result[targetCurrency]) {
        const exchangeRate = rateData.result[targetCurrency];
        return balance * exchangeRate;
      } else {
        throw new Error('Tasa de cambio no disponible.');
      }
    } catch (error) {
      console.error('Error al obtener la tasa de cambio:', error);
      return balance;
    }
  }
  


}
