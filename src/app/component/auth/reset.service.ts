import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResetPasswordResponse {
  nom: string;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ResetService {
  private apiUrl = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) {}

  reset(nom: string, newPassword: string): Observable<ResetPasswordResponse> {
    return this.http.post<ResetPasswordResponse>(`${this.apiUrl}/reset-password`, { nom, newPassword });
  }
}
