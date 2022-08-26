import { Component, OnInit } from '@angular/core';
import { ParseServerAuthenticationService } from '@gs/authenticate/state';

@Component({
  template: 'log out'
})
export class LogoutComponent implements OnInit {
  constructor(private auth: ParseServerAuthenticationService) {}

  ngOnInit(): void {
    this.auth.logout();
  }
}
