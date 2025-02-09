import { Injectable } from '@angular/core';
import { IInvest } from 'src/app/entities/interfaces';

@Injectable({
  providedIn: 'root',
})
export class InvestmentManagerService {
  private storageKey = 'investments';

  constructor() {}

  getInvestments(): IInvest[] {
    const investments = localStorage.getItem(this.storageKey);
    return investments ? JSON.parse(investments) : [];
  }

  saveInvestments(investments: IInvest[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(investments));
  }

  addInvestment(newInvestment: IInvest): void {
    const investments = this.getInvestments();
    investments.push(newInvestment);
    this.saveInvestments(investments);
  }

  getInvestmentsByAccount(accountId: string): IInvest[] {
    return this.getInvestments().filter((investment) => investment.accountId === accountId);
  }
  
}