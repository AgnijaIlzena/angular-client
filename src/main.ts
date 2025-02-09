import { bootstrapApplication, provideProtractorTestingSupport } from '@angular/platform-browser';
// import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { importProvidersFrom } from '@angular/core';
import { provideRouter} from "@angular/router";
import routeConfig from './app/app.routes';
import {GoogleMapsModule} from "@angular/google-maps";

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig),
      importProvidersFrom(GoogleMapsModule),
    ]
  }
  ).catch((err) => console.error(err));
