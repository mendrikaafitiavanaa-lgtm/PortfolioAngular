import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// DTOs côté Angular
export interface RentalItemDto {
  carId: number;
  dateDebut: string; // ISO string
  dateFin: string;   // ISO string
}

  
export interface ClientDto {
    id: number;
    nom: string;
    telephone: string;
    adresse: string;
  }

export interface RentalRequestDto {
  clientId: number;
  rentals: RentalItemDto[];
}
export interface CarDto {
  id: number;
  modele: string;
  disponible: boolean;
  photoUrl: string;
  categorieId: number;
  tarifJournalier: number;
}
@Injectable({ providedIn: 'root' })
export class RentalService {
  private apiUrl = 'http://localhost:5023/api/rental';
  private apiUrlClient = 'http://localhost:5023/api/client';
  private apiUrlCar = 'http://localhost:5023/api/car';
  constructor(private http: HttpClient) {}
  getAllClient(): Observable<ClientDto[]> {
    return this.http.get<ClientDto[]>(this.apiUrlClient);
  }
  getAllCar(): Observable<CarDto[]> {
    return this.http.get<CarDto[]>(this.apiUrlCar);
  }
  

  // 🔹 Créer une facture dynamique
  createDynamic(dto: RentalRequestDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/dynamic`, dto);
  }

  // 🔹 Mettre à jour une facture dynamique
  updateDynamic(id: number, dto: RentalRequestDto): Observable<any> {
    return this.http.put(`${this.apiUrl}/dynamic/${id}`, dto);
  }

  // 🔹 Récupérer une facture par ID
  getInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dynamic/${id}`);
  }
  //ai imprimer
  FactureInvoiceById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/dynamic/${id}/pdf`, { responseType: 'blob' });
  }
  

}
