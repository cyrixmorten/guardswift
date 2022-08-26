import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GpsMapFeatureModule } from '@gs/gps-map/feature';
import { GpsMapPageComponent } from './gps-map-page/gps-map-page.component';
import { RouterModule } from '@angular/router';
import { SharedAngularMaterialModule } from '@gs/shared-angular-material';


@NgModule({
  imports: [CommonModule, SharedAngularMaterialModule, GpsMapFeatureModule, RouterModule.forChild([{
    path: '',
    pathMatch: 'full',
    component: GpsMapPageComponent,
  }])],
  declarations: [GpsMapPageComponent],
  exports: [GpsMapPageComponent],
})
export class GpsMapShellModule {}
