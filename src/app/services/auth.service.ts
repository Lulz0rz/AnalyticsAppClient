import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl;
  jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(user: User) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, user, httpOptions);
  }

  logout() {
    localStorage.removeItem('token');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  isLoggedIn() {
    const token = this.getToken();

    if (token) {
      const isExpired = this.jwtHelper.isTokenExpired(token);
      
      if (isExpired) {
        this.logout();
        return false;
      }

      return true;
    } else {
      return true;
    }
  }
}
