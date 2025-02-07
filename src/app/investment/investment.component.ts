import {Component, inject, Input, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Investment} from "../investment";
import {InvestmentService} from "../investment.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {InvestmentlocationComponent} from "../investmentlocation/investmentlocation.component";
import { FormsModule} from "@angular/forms";

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InvestmentlocationComponent, CommonModule, FormsModule],
  templateUrl: 'investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {
  investmentLocationList: Investment[] = [];
  investmentService: InvestmentService = inject(InvestmentService);

  filters = {
    ville: '',
    etatAvancement: ''
  };

  constructor() {
    this.fetchInvestments();
  }
    // this.investmentService.getAllInvestmentLocations().then((investmentLocationList: Investment[]) => {
    //   this.investmentLocationList = investmentLocationList;
    // });
  // }

  fetchInvestments(){
    // this.investmentService.getAllInvestmentLocations().then((investmentLocationList: Investment[]) => {
    //   this.investmentLocationList = investmentLocationList;
    this.investmentService.getFilteredInvestments(this.filters).then((investmentLocationList: Investment[]) => {
      console.log("Filtered investments:", investmentLocationList);
      this.investmentLocationList = investmentLocationList;
    });
  }

  applyFilters() {
    this.fetchInvestments();
  }

  // Reset filters
  resetFilters() {
    this.filters = { ville: '', etatAvancement: '' };
    this.fetchInvestments();
  }
}
