import { Component } from '@angular/core';

@Component({
  selector: 'gs-gps-map-page',
  template: `
  <div class="flex flex-col h-screen">
    <!--
    <mat-toolbar class="mat-elevation-z2" style="z-index: 800">
      <span>GuardSwift GPS Historik</span>
    </mat-toolbar> -->
    <div class="flex flex-grow">
      <div class="w-38">
        <gs-gps-track-list></gs-gps-track-list>
      </div>
      <div class="grow">
        <gs-gps-map></gs-gps-map>
      </div>
    </div>
  </div>
  `,
  styleUrls: ['./gps-map-page.component.scss'],
})
export class GpsMapPageComponent {}
