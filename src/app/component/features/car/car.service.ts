import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface CarDto {
  id: number;
  modele: string;
  disponible: boolean;
  photoUrl: string;
  categorieId: number;
  tarifJournalier: number;
}
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
export class CarService {
  private apiUrl = 'http://localhost:5023/api/car';
  private apiUrls = 'http://localhost:5023/api/category';
 private rentalUrls= 'http://localhost:5023/api/rental';
  constructor(private http: HttpClient) {}
  getAllCategory(): Observable<CategoryDto[]> {
    return this.http.get<CategoryDto[]>(this.apiUrls);
  }
  getPaged(page = 1, size = 5): Observable<PagedResult<CarDto>> {
    return this.http.get<PagedResult<CarDto>>(
      `${this.apiUrl}/paged?page=${page}&pageSize=${size}`
    );
  }
  searchCar(modele: string,page = 1, size = 5): Observable<PagedResult<CarDto>> {
    return this.http.get<PagedResult<CarDto>>(
      `${this.apiUrl}/search?modele=${modele}&page=${page}&pageSize=${size}`
    );
  }
  create(dto: FormData): Observable<CarDto> {
    return this.http.post<CarDto>(this.apiUrl, dto);
  }

  update(id: number, dto: FormData): Observable<CarDto> {
    return this.http.put<CarDto>(`${this.apiUrl}/${id}`, dto);
  }

  getById(id: number): Observable<CarDto> {
    return this.http.get<CarDto>(`${this.apiUrl}/${id}`);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  GetAvailableCars(debut: string, fin: string, page = 1, size = 5): Observable<PagedResult<CarDto>> {
    return this.http.get<PagedResult<CarDto>>(
      `${this.rentalUrls}/disponible?debut=${debut}&fin=${fin}&page=${page}&pageSize=${size}`
    );
  }
  
}
