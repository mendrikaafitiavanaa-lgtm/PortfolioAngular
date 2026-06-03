import { Injectable } from '@angular/core';
  import { HttpClient } from '@angular/common/http';
  import { Observable } from 'rxjs';
  
  export interface InvoiceDto {
    id: number;
    clientId: number;
    clientNom: string;
    clientAdresse: string;
    clientTelephone: string;
    montantTotal: number;
    statut: string; // ou boolean si backend renvoie true/false
    rentals: any[];
  }
  

  export interface PagedResult<T> {
    items: T[];
    totalCount: number;
    page: number;
    pageSize: number;
  }
  
  @Injectable({ providedIn: 'root' })
  export class FactureService {
    private apiUrl = 'http://localhost:5023/api/rental';
  
    constructor(private http: HttpClient) {}
    
    GetAllInvoices(page = 1, size = 5): Observable<PagedResult<InvoiceDto>> {
      return this.http.get<PagedResult<InvoiceDto>>(
        `${this.apiUrl}/dynamic?page=${page}&pageSize=${size}`
      );
    }
    searchFacture(clientName: string,page = 1, size = 5): Observable<PagedResult<InvoiceDto>> {
      return this.http.get<PagedResult<InvoiceDto>>(
        `${this.apiUrl}/search?clientName=${clientName}&page=${page}&pageSize=${size}`
      );
    }
    
   
    
    getById(id: number): Observable<InvoiceDto> {
      return this.http.get<InvoiceDto>(`${this.apiUrl}/${id}`);
    }
  
    delete(id: number): Observable<void> {
      return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
    FactureInvoiceById(id: number): Observable<any> {
      return this.http.get(`${this.apiUrl}/dynamic/${id}/pdf`, { responseType: 'blob' });
    }
  }
  

