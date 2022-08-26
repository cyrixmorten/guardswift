import { Injectable } from '@angular/core';
import * as Parse from 'parse';

@Injectable({
  providedIn: 'root'
})
export class ParseServerAuthenticationService {

  async login(username: string, password: string) {
    await Parse.User.logIn(username, password);
  }
  
  become(sessionToken: string) {
    return Parse.User.become(sessionToken);
  }

  getCurrentUser() {
    return Parse.User.current()
  }

  
  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  async logout() {
    return await Parse.User.logOut();
  }

}
