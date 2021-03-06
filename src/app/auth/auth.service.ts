import { Injectable} from '@angular/core';
import { tokenNotExpired } from 'angular2-jwt';
@Injectable()

export class AuthService {
 private loggedIn = false;
 constructor() { }
  public getToken(): string {
     return `${JSON.parse(localStorage.getItem('token')).token}`;
  }
/*
  isLoggedIn() {
      if (localStorage.getItem('token')) {
        return this.loggedIn = true;
      }
    }

   logout() {
     localStorage.removeItem('token');
     this.loggedIn = false;
    }
 */
  public isAuthenticated(): boolean {
    const token = this.getToken();
    return tokenNotExpired();
  } 

}
