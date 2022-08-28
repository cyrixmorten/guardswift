import { NgModule } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { CommonModule } from '@angular/common';
import { GpsMapComponent } from './gps-map/gps-map.component';
import { GpsTrackListComponent } from './gps-track-list/gps-track-list.component';
import { SharedAngularMaterialModule } from '@gs/shared-angular-material';
import { FormsModule } from '@angular/forms';
import { GpsMapUiModule } from '@gs/gps-map/ui';
import { NgPipesModule } from 'ngx-pipes';
import { EventlogListComponent } from './eventlog-list/eventlog-list.component';

@NgModule({
  imports: [
    CommonModule,
    GpsMapUiModule,
    NgPipesModule,
    FormsModule,
    GoogleMapsModule,
    SharedAngularMaterialModule,
  ],
  declarations: [GpsMapComponent, GpsTrackListComponent, EventlogListComponent],
  exports: [GpsMapComponent, GpsTrackListComponent],
})
export class GpsMapFeatureModule {}
