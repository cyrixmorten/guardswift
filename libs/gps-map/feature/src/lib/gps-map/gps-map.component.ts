import { Component, OnDestroy, OnInit } from '@angular/core';
import { GpsTrackService } from '@gs/gps-map/state';
import { Subscription } from 'rxjs';
import { GPSData } from '@gs/shared/parse/subclass-util';

@Component({
  selector: 'gs-gps-map',
  template: `
    <google-map 
      height="100%"
      width="100%"
      [zoom]="zoom"
      [center]="center"
      [options]="options">
      <map-marker *ngFor="let markerPosition of markerPositions"
              [position]="markerPosition"
              [options]="markerOptions"></map-marker>
      <map-polyline [path]="vertices" [options]="polyLineOptions"></map-polyline>
    </google-map>
    `,
  
})
export class GpsMapComponent implements OnInit, OnDestroy {

  options: google.maps.MapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
  }
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  vertices: google.maps.LatLngLiteral[] = [];
  polyLineOptions: google.maps.PolylineOptions = {
    strokeColor: 'red',
  };

  private subscription = new Subscription();

  constructor(private gpsTrack: GpsTrackService) {}

  ngOnInit(): void {
    this.center = this.gpsTrack.center;
    this.observeGPSData();
  }

  observeGPSData() {
    this.subscription.add(
      this.gpsTrack.gpsData.subscribe((gpsData: GPSData[]) => {
          this.vertices = gpsData.map(data => ({
            lat: data.latitude,
            lng: data.longitude
          }))
          if (this.vertices.length > 0) {
            this.center = this.vertices[0];
          }
          
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

} 