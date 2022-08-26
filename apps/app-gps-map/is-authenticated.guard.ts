import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ParseServerAuthenticationService } from '@gs/authenticate/state';

@Injectable({
  providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(
    private parseAuthentication: ParseServerAuthenticationService,
    private router: Router
  ) {}

  canActivate() {
    if (this.parseAuthentication.isLoggedIn()) {
      return true;
    } else {
      return this.router.parseUrl('/auth/login');
    }
  }
}
