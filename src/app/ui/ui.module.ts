import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountCardComponent } from './account-card/account-card.component';
import { AccDetailModalComponent } from './acc-detail-modal/acc-detail-modal.component';
import { TransaccionListComponent } from './transaccion-list/transaccion-list.component';
import { TransactionModalComponent } from './transaction-modal/transaction-modal.component';
import { PipesModule } from '../pipes/pipes.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { InvestmentListComponent } from './investment-list/investment-list.component';
import { DivisasModalComponent } from './divisas-modal/divisas-modal.component';
import { DivisasListComponent } from './divisas-list/divisas-list.component';



@NgModule({
  declarations: [
    AccountCardComponent,
    AccDetailModalComponent,
    TransaccionListComponent,
    TransactionModalComponent,
    InvestmentListComponent,
    DivisasModalComponent,
    DivisasListComponent
  ],
  imports: [
    CommonModule,
    PipesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    AccountCardComponent,
    TransaccionListComponent,
    InvestmentListComponent,
    DivisasListComponent
  ]
})
export class UiModule { }
