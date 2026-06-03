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
export class RegisterService {
  private apiUrl = 'http://localhost:5023/api/users';

  constructor(private http: HttpClient) {}

  register(nom: string, password: string, photo?: File): Observable<UserResponse> {
    const formData = new FormData();
    formData.append('Nom', nom);
    formData.append('Password', password);
    if (photo) {
      formData.append('photo', photo);
    }

    // ⚠️ Ne pas mettre Content-Type: application/json, laisser le navigateur gérer multipart/form-data
    return this.http.post<UserResponse>(`${this.apiUrl}/register`, formData);
  }
}
