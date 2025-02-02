import {Component, inject, Input, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Investment} from "../investment";
import {InvestmentService} from "../investment.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {InvestmentlocationComponent} from "../investmentlocation/investmentlocation.component";

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InvestmentlocationComponent, CommonModule],
  template: `
<!--    <section class="listing">-->
<!--      <h2 class="listing-heading">{{ investment.titreoperation }}</h2>-->
<!--      <p class="listing-location">{{ investment.ville}}, {{investment.entreprise }}</p>-->
<!--      <a [routerLink]="['/details', investment.id]">Learn More</a>-->
<!--    </section>-->

  <section class="results">
    <!--        <app-housing-location [housingLocation]="housingLocation"></app-housing-location>-->
            <app-investmentlocation
              *ngFor="let investment of investmentLocationList"
              [investmentLocation]="investment">
            </app-investmentlocation>
  </section>
  `,
  styleUrl: './investment.component.css'
})
export class InvestmentComponent {
  investmentLocationList: Investment[] = [];
  investmentService: InvestmentService = inject(InvestmentService);

  constructor() {
    // this.investmentLocationList = this.investmentService.getAllInvestmentLocations();
    // console.log("this.investmentLocationList", this.investmentLocationList);
    this.investmentService.getAllInvestmentLocations().then((investmentLocationList: Investment[]) => {
      this.investmentLocationList = investmentLocationList;
      // this.filteredLocationList = housingLocationList;
    });
  }
}
