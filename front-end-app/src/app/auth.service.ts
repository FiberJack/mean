import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  token: any;
  user: any;

  constructor(private http: HttpClient, public jwtHelper: JwtHelperService) { }

  registerUser(user) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:8080/account/reg',
      user,
      {headers:myHeaders}).pipe(map((response: any) => response));
  }

  authUser(user) {
    const myHeaders = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post(
      'http://localhost:8080/account/auth',
      user,
      {headers:myHeaders}).pipe(map((response: any) => response));
  }

  storeUser(token, user) {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.token = token;
    this.user = user;
  }

  logout() {
    this.token = null;
    this.user = null;
    localStorage.clear();
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    // Check if the token is expired and return true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  // isLoggedIn() {
  //   return this.jwtHelper.isTokenExpired(this.token);
  // }

}
