import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent, LogoutComponent } from '@gs/authenticate/feature';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
       {path: 'login', component: LoginComponent},
       {path: 'logout', component: LogoutComponent} 
    ]),
  ],
})
export class AuthenticateShellModule {}
