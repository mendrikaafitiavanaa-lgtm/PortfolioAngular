import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CategoryDto {
  id: number;
  nom: string;
  
}
export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  page: number;
  pageSize: number;
}

@Injectable({ providedIn: 'root' })
export class CategoryService {
  private apiUrl = 'http://localhost:5023/api/category';

  constructor(private http: HttpClient) {}

  // Créer une catégorie
  create(nom: string): Observable<CategoryDto> {
    return this.http.post<CategoryDto>(this.apiUrl, { nom });
  }
  searchCategory(nom: string,page = 1, size = 5): Observable<PagedResult<CategoryDto>> {
    return this.http.get<PagedResult<CategoryDto>>(
      `${this.apiUrl}/search?nom=${nom}&page=${page}&pageSize=${size}`
    );
  }

  // Récupérer une catégorie par ID
  getById(id: number): Observable<CategoryDto> {
    return this.http.get<CategoryDto>(`${this.apiUrl}/${id}`);
  }


  // Récupérer les catégories paginées
  getPaged(page = 1, size = 5): Observable<PagedResult<CategoryDto>> {
    return this.http.get<PagedResult<CategoryDto>>(
      `${this.apiUrl}/paged?page=${page}&pageSize=${size}`
    );
  }

  // Mettre à jour une catégorie
  update(id: number, dto: Partial<CategoryDto>): Observable<CategoryDto> {
    return this.http.put<CategoryDto>(`${this.apiUrl}/${id}`, dto);
  }

  // Supprimer une catégorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
