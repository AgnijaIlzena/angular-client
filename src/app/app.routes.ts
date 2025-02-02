import { Routes } from '@angular/router';
import {InvestmentComponent} from "./investment/investment.component";
import {InvestmentDetailsComponent} from "./investment-details/investment-details.component";

const routeConfig: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent,
  //   title: 'Home page'
  // },
  {
    path: 'investment',
    component: InvestmentComponent,
    title: 'Investment page'
  },
  {
    path: 'investment-details/:id',
    component: InvestmentDetailsComponent,
    title: 'Investment details page'
  }
];

export default routeConfig;

// export const routes: Routes = [];
