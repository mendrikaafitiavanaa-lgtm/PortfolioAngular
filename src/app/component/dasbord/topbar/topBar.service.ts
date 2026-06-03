import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserResponse {
  id: number;
  nom: string;
  role: string;
  photoUrl?: string;
}

@Injectable({ providedIn: 'root' })
export class MeService {
  private apiUrl = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) {}

  me(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${this.apiUrl}/me`);
  }
}
