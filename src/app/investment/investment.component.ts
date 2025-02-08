import {Component, inject, Input, input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Investment} from "../investment";
import {InvestmentService} from "../investment.service";
import {RouterLink, RouterOutlet} from "@angular/router";
import {InvestmentlocationComponent} from "../investmentlocation/investmentlocation.component";
import { FormsModule} from "@angular/forms";
import {ChartData, ChartOptions, ChartType, ChartTypeRegistry} from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-investment',
  standalone: true,
  imports: [RouterOutlet, RouterLink, InvestmentlocationComponent, CommonModule, FormsModule, NgChartsModule],
  templateUrl: 'investment.component.html',
  styleUrls: ['./investment.component.css'],
})
export class InvestmentComponent {
  investmentLocationList: Investment[] = [];
  investmentService: InvestmentService = inject(InvestmentService);

  showCharts: boolean = true;  // Controls chart visibility

  filters = {
    ville: '',
    etatAvancement: ''
  };

  // Chart Data
  public barChartLabels: string[] = [];
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Total Investment (€M)', backgroundColor: '#C5BAFF' }
    ]
  };
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y', // ✅ Horizontal Bar Chart
    scales: {
      x: { beginAtZero: true },
      y: { ticks: { font: { size: 12 } } }
    },
    plugins: {
      legend: { display: true },
    }
  };
  public barChartType: ChartType = 'bar' as keyof ChartTypeRegistry;

  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: ['#DF2935', '#12355B', '#00B295', '#3D3B8E', '#C5BAFF', '#C4D9FF'],
      },
    ],
  };
  pieChartLabels: string[] = [];
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
      },
      tooltip: {
        enabled: true,
      },
    },
  };
  public pieChartType: ChartType = 'pie';

  constructor() {
    this.fetchInvestments();
  }

  fetchInvestments(){
    this.investmentService.getFilteredInvestments(this.filters).then((investmentLocationList: Investment[]) => {
      console.log("Filtered investments:", investmentLocationList);
      this.investmentLocationList = investmentLocationList;
      this.prepareChartData();
      this.preparePiechartData();
    });
  }

  applyFilters() {
    this.fetchInvestments();
  }

  resetFilters() {
    this.filters = { ville: '', etatAvancement: '' };
    this.fetchInvestments();
  }

  prepareChartData() {
    const investmentByEnterprise: { [key: string]: number } = {};

    this.investmentLocationList.forEach(investment => {
      if (investment.entreprise) {
        investmentByEnterprise[investment.entreprise] =
          (investmentByEnterprise[investment.entreprise] || 0) + investment.montantVotes;
      }
    });

    const sortedEnterprises = Object.entries(investmentByEnterprise)
      .sort((a, b) => b[1] - a[1]);

    this.barChartLabels = sortedEnterprises.map(entry => entry[0]);
    this.barChartData.labels = this.barChartLabels;
    this.barChartData.datasets[0].data = sortedEnterprises.map(entry => entry[1]) as number[];
  }

  preparePiechartData(){
    const investmentByVille: { [key: string]: number } = {};

    this.investmentLocationList.forEach(investment => {
      if (investmentByVille[investment.ville]) {
        investmentByVille[investment.ville] += investment.montantVotes;
      } else {
        investmentByVille[investment.ville] = investment.montantVotes;
      }
    });

    this.pieChartData = {
      labels: Object.keys(investmentByVille),
      datasets: [
        {
          data: Object.values(investmentByVille),
          backgroundColor: ['#DF2935', '#12355B', '#00B295', '#3D3B8E', '#C5BAFF', '#C4D9FF'],
        },
      ],
    };
  }
  }


