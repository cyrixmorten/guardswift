import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParseServerAuthenticationService } from '@gs/authenticate/state';


@Component({
  selector: 'gs-login',
  template: ` <p>Login</p> `,
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private auth: ParseServerAuthenticationService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(async (params: Params) => {
        const sessionToken = params['sessionToken'];
        if (sessionToken) {
          await this.auth.become(sessionToken);
          await this.router.navigate(['/map'])
        }
      }
    );
  }
}
