import { Component, Input } from '@angular/core';
import {CommonModule} from "@angular/common";
import {Investment} from "../investment";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-investmentlocation',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <section class="listing">
      <div class="listing-img-container">
        <img class="listing-photo" [src]="getImageUrl(200, 200, 5)" alt="Exterior photo of {{investmentLocation.titreoperation}}">
      </div>
      <div class="listing-heading-container">
        <h2 class="listing-heading">{{ investmentLocation.titreoperation }}</h2>
      </div>

      <p class="listing-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#12355B" class="me-1 bi bi-buildings-fill" viewBox="0 0 16 16">
          <path d="M15 .5a.5.5 0 0 0-.724-.447l-8 4A.5.5 0 0 0 6 4.5v3.14L.342 9.526A.5.5 0 0 0 0 10v5.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V14h1v1.5a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5zM2 11h1v1H2zm2 0h1v1H4zm-1 2v1H2v-1zm1 0h1v1H4zm9-10v1h-1V3zM8 5h1v1H8zm1 2v1H8V7zM8 9h1v1H8zm2 0h1v1h-1zm-1 2v1H8v-1zm1 0h1v1h-1zm3-2v1h-1V9zm-1 2h1v1h-1zm-2-4h1v1h-1zm3 0v1h-1V7zm-2-2v1h-1V5zm1 0h1v1h-1z"/>
        </svg>
        {{ investmentLocation.lycee}}
      </p>
      <p class="listing-location">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#DF2935" class="me-1 bi bi-geo-alt-fill" viewBox="0 0 16 16">
          <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
        </svg>
        {{investmentLocation.ville }}
      </p>

      <div class="mt-5">
        <a [routerLink]="['/investment-details', investmentLocation.id]">En savoir plus</a>
      </div>
    </section>
  `,
  styleUrl: './investmentlocation.component.css'
})
export class InvestmentlocationComponent {
  @Input() investmentLocation!: any;

  getRandomImageId(): number {
    return Math.floor(Math.random() * 100) + 1;
  }

  getImageUrl(width: number = 200, height: number = 300, blur: number = 1): string {
    const randomId = this.getRandomImageId();
    return `https://picsum.photos/id/${randomId}/${width}/${height}?blur=${blur}`;
  }
}
