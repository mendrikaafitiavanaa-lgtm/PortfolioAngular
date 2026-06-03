import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ClientDto {
  id: number;
  nom: string;
  telephone: string;
  adresse: string;
}

export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class ClientService {
  private apiUrl = 'http://localhost:5023/api/client';

  constructor(private http: HttpClient) {}

  // Créer un client
  create(dto: Partial<ClientDto>): Observable<ClientDto> {
    return this.http.post<ClientDto>(this.apiUrl, dto);
  }
  searchClient(nom: string,page = 1, size = 5): Observable<PagedResult<ClientDto>> {
    return this.http.get<PagedResult<ClientDto>>(
      `${this.apiUrl}/search?nom=${nom}&page=${page}&pageSize=${size}`
    );
  }

  // Récupérer un client par ID
  getById(id: number): Observable<ClientDto> {
    return this.http.get<ClientDto>(`${this.apiUrl}/${id}`);
  }

  // Récupérer les clients paginés
  getPaged(page = 1, size = 5): Observable<PagedResult<ClientDto>> {
    return this.http.get<PagedResult<ClientDto>>(
      `${this.apiUrl}/paged?page=${page}&pageSize=${size}`
    );
  }

  // Mettre à jour un client
  update(id: number, dto: Partial<ClientDto>): Observable<ClientDto> {
    return this.http.put<ClientDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Supprimer un client
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
