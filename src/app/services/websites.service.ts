import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { CreateWebsite, Website } from '../models/website';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private httpservice: HttpService) { }

  get() {
    const httpOptions = this.httpservice.getHeaders();

    return this.http.get<Website>(`${this.apiUrl}/websites`, httpOptions);
  }

  create(website: CreateWebsite) {
    const httpOptions = this.httpservice.getHeaders();

    return this.http.post<Website>(`${this.apiUrl}/websites`, website, httpOptions);
  }

  delete(websiteId) {
    const httpOptions = this.httpservice.getHeaders();

    return this.http.delete<Website>(`${this.apiUrl}/websites/${websiteId}`, httpOptions);
  }

}