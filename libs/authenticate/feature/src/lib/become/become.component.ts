import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ParseServerAuthenticationService } from '@gs/authenticate/state';

@Component({
  selector: 'gs-become',
  template: ` <p>Become works!</p> `,
  styles: [],
})
export class BecomeComponent implements OnInit {
  constructor(private auth: ParseServerAuthenticationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(async (params) => {
        const sessionToken = params['sessionToken'];
        if (sessionToken) {
          await this.auth.become(sessionToken);
          await this.router.navigate(['/map'])
        }
      }
    );
  }
}
