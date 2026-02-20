import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Phrase, CreatePhraseRequest } from '../../shared/models/types';

@Injectable({
  providedIn: 'root'
})
export class PhraseApiService {
  private http = inject(HttpClient);
  private baseUrl = `${environment.apiUrl}/phrases`;

  getUserPhrases(): Observable<Phrase[]> {
    return this.http.get<Phrase[]>(this.baseUrl);
  }

  createPhrase(request: CreatePhraseRequest): Observable<Phrase> {
    return this.http.post<Phrase>(this.baseUrl, request);
  }

  updatePhrase(id: number, isActive: boolean): Observable<Phrase> {
    return this.http.put<Phrase>(`${this.baseUrl}/${id}`, { isActive });
  }

  deletePhrase(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

