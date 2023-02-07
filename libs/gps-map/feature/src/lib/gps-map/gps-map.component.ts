import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { GpsTrackService } from '@gs/gps-map/state';
import { Subscription } from 'rxjs';
import { EventLog, GPSData } from '@gs/shared/parse/subclass-util';
import {GoogleMap, MapInfoWindow, MapMarker, MapPolyline} from "@angular/google-maps";

@Component({
  selector: 'gs-gps-map',
  template: `
    <div class="flex flex-row h-screen">
      <google-map
        class="grow"
        height="100%"
        width="100%"
        [zoom]="zoom"
        [center]="center"
        [options]="options">
        <map-marker *ngFor="let markerPosition of markerPositions"
                [position]="markerPosition"
                [options]="markerOptions"></map-marker>
        <map-polyline [path]="vertices" [options]="polyLineOptions" (polylineMouseover)="openInfoWindow($event)"></map-polyline>
        <map-info-window [position]="center">
          <div *ngIf="hoverGPSData">
            {{hoverGPSData.time | date:'d/M/yy HH:mm'}}
          </div>
        </map-info-window>
      </google-map>

      <div class="w-72" *ngIf="vertices.length > 0">
        <gs-eventlog-list (eventlog)="selectEventlog($event)"></gs-eventlog-list>
      </div>
    </div>
    `,

})
export class GpsMapComponent implements OnInit, OnDestroy {
  @ViewChild(MapInfoWindow,  { static: true }) pathInfoWindo!: MapInfoWindow;

  options: google.maps.MapOptions = {
    fullscreenControl: false,
    streetViewControl: false,
  }
  center: google.maps.LatLngLiteral = {lat: 56.162939, lng: 10.203921};
  zoom = 12;
  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
  };
  markerPositions: google.maps.LatLngLiteral[] = [];
  vertices: google.maps.LatLngLiteral[] = [];
  polyLineOptions: google.maps.PolylineOptions = {
    strokeColor: 'red',
    clickable: true,
    editable: true,
    draggable: false,
  };
  public hoverGPSData: GPSData | undefined = undefined;

  private subscription = new Subscription();

  constructor(private gpsTrack: GpsTrackService) {}

  ngOnInit(): void {
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

        this.hoverGPSData = gpsData[0];
        this.pathInfoWindo.open();

      })
    )
  }

  openInfoWindow(event: google.maps.PolyMouseEvent) {
    const {latLng, vertex} = event;

    if (latLng) {
      this.pathInfoWindo.position = latLng;
    }

    if (vertex) {
      this.hoverGPSData = this.gpsTrack.gpsData.getValue()[vertex];
    }

    this.pathInfoWindo.open();
  }

  selectEventlog(eventlog: EventLog) {
    const {latitude, longitude} = eventlog.position;
    const markerPosition = {
      lat: latitude,
      lng: longitude
    };
    this.markerPositions[0] = markerPosition;
    this.center = markerPosition;
    this.zoom = 16;
    this.pathInfoWindo.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
