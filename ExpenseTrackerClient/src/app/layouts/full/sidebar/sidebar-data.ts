import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Transactions',
  },
  {
    displayName: 'Transactions',
    iconName: 'rosette',
    route: '/transactions',
  },
  {
    displayName: 'Add Transaction',
    iconName: 'aperture',
    route: '/add-transactions',
  },
  {
    navCap: 'Budget',
  },
  {
    displayName: 'Budget',
    iconName: 'list-details',
    route: '/budget',
  },
  {
    navCap: 'Income & Expense',
  },
  {
    displayName: 'Income vs Expense',
    iconName: 'chart-bar',
    route: '/income',
  },
  {
    navCap: 'Settings',
  },
  {
    displayName: 'Settings',
    iconName: 'user-plus',
    route: '/myAccount/settings',
  }
];
