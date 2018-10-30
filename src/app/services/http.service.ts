import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private auth: AuthService) { }

  getHeaders() {
    const token = this.auth.getToken();
    let headers = new HttpHeaders({'Content-Type':  'application/json'});

    if (token) {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }
    
    return {headers};
  }
}
