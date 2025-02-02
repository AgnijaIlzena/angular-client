import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {InvestmentComponent} from "./investment/investment.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvestmentComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'investments';
}
