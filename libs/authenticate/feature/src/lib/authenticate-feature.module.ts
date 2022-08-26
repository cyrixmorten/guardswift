import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BecomeComponent } from './become/become.component';

@NgModule({
  imports: [CommonModule],
  declarations: [LoginComponent, LogoutComponent, BecomeComponent],
  exports: [LoginComponent, LogoutComponent],
})
export class AuthenticateFeatureModule {}
