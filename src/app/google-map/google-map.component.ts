import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from "@angular/common";
import { GoogleMap, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-google-map',
  standalone: true,
  imports: [GoogleMap, MapMarker, CommonModule],
  template: `
    <google-map
      width="100%"
      height="400px"
      [zoom]="zoom"
      [center]="center">
      <map-marker
        *ngIf="latitude && longitude"
        [position]="center"
      >
      </map-marker>
    </google-map>
  `,
  styleUrl: './google-map.component.css'
})
// export class GoogleMapComponent implements OnInit {
export class GoogleMapComponent implements OnChanges {
  @Input() latitude: number = 0;
  @Input() longitude: number = 0;

  zoom: number = 14;
  center: google.maps.LatLngLiteral = { lat: 0, lng: 0 };

  // ngOnInit() {
  //   this.center = { lat: this.latitude, lng: this.longitude };
  // }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['latitude'] || changes['longitude']) {
      this.center = { lat: this.latitude, lng: this.longitude };
    }
  }
}
