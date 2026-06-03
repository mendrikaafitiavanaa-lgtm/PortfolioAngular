import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ForgotService {
  private apiUrl = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) {}

  login(nom: string): Observable<string> {
    return this.http.post(`${this.apiUrl}/forgot-password`, { nom }, { responseType: 'text' });
  }
}
