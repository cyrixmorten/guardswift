import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpsTrackEntryComponent } from './gps-track-entry/gps-track-entry.component';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [CommonModule, NgPipesModule],
  declarations: [GpsTrackEntryComponent],
  exports: [GpsTrackEntryComponent]
})
export class GpsMapUiModule {}
