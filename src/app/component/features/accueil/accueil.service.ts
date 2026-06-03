import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccueilService {
  private apiUrl = 'http://localhost:5023/api/users'; // adapte selon ton backend
  private apiCar = 'http://localhost:5023/api/car';
  private apiCategory = 'http://localhost:5023/api/category';
  private apiClient = 'http://localhost:5023/api/client';
  private apiFacture = 'http://localhost:5023/api/rental';
  constructor(private http: HttpClient) {}

 
  // Récupérer le nombre d'utilisateurs
  getUserCount(): Observable<{ utilisateurs: number }> {
    return this.http.get<{ utilisateurs: number }>(`${this.apiUrl}/count`);
  }
  getCarCount(): Observable<{ voitures: number }> {
    return this.http.get<{ voitures: number }>(`${this.apiCar}/count`);
  }
  getCategoryCount(): Observable<{ category: number }> {
    return this.http.get<{ category: number }>(`${this.apiCategory}/count`);
  }
  getClientCount(): Observable<{ client: number }> {
    return this.http.get<{ client: number }>(`${this.apiClient}/count`);
  }
  getRentalCount(): Observable<{ facture: number }> {
    return this.http.get<{ facture: number }>(`${this.apiFacture}/count`);
  }
  
}

