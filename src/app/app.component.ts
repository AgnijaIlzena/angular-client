import { Component, OnInit, Renderer2 } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';
import {InvestmentComponent} from "./investment/investment.component";
import { environment } from '../environments/environment';

declare global {
  interface Window {
    initMap: any;
  }
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InvestmentComponent, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'investments';

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    // Dynamically load the Google Maps script
    this.loadGoogleMapsScript();
  }

  loadGoogleMapsScript() {
    const script = this.renderer.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapsApiKey}&libraries=places&callback=initMap`;
    script.async = true;
    script.defer = true;

    this.renderer.appendChild(document.body, script);

    window['initMap'] = this.initMap;
  }

  // The function that will be called once the Google Maps script has loaded
  initMap() {
    console.log('Google Maps API has loaded.');
  }
}
