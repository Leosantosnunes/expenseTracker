import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { BudgetComponent } from './budget/budget.component';
import { IncomeComponent } from './income/income.component';
import moment from 'moment';
import { AppAddTransactionsComponent } from './add-transactions/add-transactions.component';
import { AppTransactionsComponent } from './transactions/transactions.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    component: AppDashboardComponent,
    data: {
      title: 'Starter Page',
    },
  },
  {
    path: 'budget',
    redirectTo: `/budget/${getCurrentMonthKey()}`,
    pathMatch: 'full',
  },
  {
    path: 'budget/:key',
    component: BudgetComponent,
  },
  {
    path: 'income',
    component: IncomeComponent,
  },
  {
    path: 'add-transactions',
    component: AppAddTransactionsComponent,
  },
  {
    path: 'transactions',
    component: AppTransactionsComponent,
  }
];

function getCurrentMonthKey() {
  return moment().format('YYYYMM');
}
