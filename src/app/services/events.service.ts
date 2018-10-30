import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';

import { Event } from '../models/event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  apiUrl: string = environment.apiUrl;

  constructor(private http: HttpClient, private auth: AuthService, private httpservice: HttpService) { }

  get(eventId: string): Observable<Event[]> {
    const httpOptions = this.httpservice.getHeaders();

    return this.http.get<Event[]>(`${this.apiUrl}/events/${eventId}`, httpOptions);
  }
}

