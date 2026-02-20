import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { NextVideoResponse, UserStats } from '../../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class FeedApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/feed`;

  getNextVideo(): Observable<NextVideoResponse> {
    return this.http.get<NextVideoResponse>(`${this.baseUrl}/next`);
  }

  getUserStats(): Observable<UserStats> {
    return this.http.get<UserStats>(`${this.baseUrl}/stats`);
  }

  cleanHistory(): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/clean-history`, {});
  }
}

