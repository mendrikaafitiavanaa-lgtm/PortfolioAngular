import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginResponse {
  token: string;
  expiration: string;
  nom: string;
  role: string;
}


@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = 'http://localhost:5023/api/users'; // adapte l’URL

  constructor(private http: HttpClient) {}

  login(nom: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { nom, password });
  }
  
}
