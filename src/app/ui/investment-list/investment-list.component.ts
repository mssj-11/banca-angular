import { Component, OnInit } from '@angular/core';
import { InvestmentManagerService } from 'src/app/services/investment-manager.service';
import { IAccount, IInvest } from 'src/app/entities/interfaces';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddInvestmentModalComponent } from '../add-investment-modal/add-investment-modal.component';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-investment-list',
  templateUrl: './investment-list.component.html',
  styleUrls: ['./investment-list.component.scss'],
})
export class InvestmentListComponent implements OnInit {
  accounts: IAccount[] = [];  // Arreglo de cuentas
  investments: IInvest[] = [];
  selectedAccountId: string = '';

  constructor(
    private investmentService: InvestmentManagerService,
    private modalService: NgbModal,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.loadAccounts();  // Cargar cuentas desde LocalStorage
  }

  loadAccounts(): void {
    // Recuperamos el objeto 'customer' desde LocalStorage
    const customer = this.localStorage.retrieve('customer');
    
    if (customer && customer.accounts && Array.isArray(customer.accounts)) {
      this.accounts = customer.accounts;  // Asignamos las cuentas al arreglo
      this.selectedAccountId = this.accounts[0]?.accountId || ''; // Si hay cuentas, seleccionamos la primera
    } else {
      console.error('No se encontraron cuentas en LocalStorage');
      this.accounts = []; // Si no hay cuentas, dejamos el arreglo vacío
    }

    this.loadInvestments(); // Cargar las inversiones de la cuenta seleccionada
  }

  loadInvestments(): void {
    if (this.selectedAccountId) {
      this.investments = this.investmentService.getInvestmentsByAccount(this.selectedAccountId);
      this.updateGrowth();
    }
  }

  openAddInvestmentModal(): void {
    const modalRef = this.modalService.open(AddInvestmentModalComponent, { size: 'lg' });
    modalRef.componentInstance.accounts = this.accounts;
    modalRef.componentInstance.reloadInvestments = this.loadInvestments.bind(this);
  }

  updateGrowth(): void {
    setInterval(() => {
      this.investments.forEach((investment) => {
        const growth = (investment.balance * investment.investRate) / 100;
        investment.growth = (investment.growth || 0) + growth;
      });
    }, 10000);
  }


  
}
