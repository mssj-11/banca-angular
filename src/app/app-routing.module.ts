import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsListComponent } from './accounts-list/accounts-list.component';
import { MovementsComponent } from './movements/movements.component';
import { InvestmentListComponent } from './ui/investment-list/investment-list.component';
import { ForeignExchangeComponent } from './foreign-exchange/foreign-exchange.component';
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'accounts-list', component: AccountsListComponent, canActivate: [AuthGuard]  },
  { path: 'movements', component: MovementsComponent, canActivate: [AuthGuard]  },
  { path: 'investment', component: InvestmentListComponent, canActivate: [AuthGuard]  },
  { path: 'currency', component: ForeignExchangeComponent, canActivate: [AuthGuard]  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
