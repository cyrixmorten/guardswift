import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IsAuthenticatedGuard } from '../../is-authenticated.guard';

const routes: Routes = [
  {
    path: 'map',
    canActivate: [IsAuthenticatedGuard],
    loadChildren: () =>
      import('@gs/gps-map/shell').then((m) => m.GpsMapShellModule),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('@gs/authenticate/shell').then((m) => m.AuthenticateShellModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/map',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
