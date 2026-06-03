import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest } from 'rxjs';  // ← AJOUTE CET IMPORT
import { AccueilService } from './accueil.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import { LineChartComponent } from './line-chart.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, LineChartComponent],
  templateUrl: './accueil.component.html'
})
export class AccueilComponent implements OnInit {
  darkMode = false;
  loading = true;  // ← AJOUTE POUR GÉRER LE CHARGEMENT
  error = false;   // ← AJOUTE POUR GÉRER LES ERREURS

  counts = {
    utilisateurs: 0,
    voitures: 0,
    categories: 0,
    clients: 0,
    factures: 0
  };

  constructor(
    private accueilService: AccueilService,
    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.loading = true;
    this.error = false;

    // Utilise combineLatest pour attendre que TOUS les appels soient terminés
    combineLatest([
      this.accueilService.getUserCount(),
      this.accueilService.getCarCount(),
      this.accueilService.getCategoryCount(),
      this.accueilService.getClientCount(),
      this.accueilService.getRentalCount()
    ]).subscribe({
      next: ([users, cars, categories, clients, rentals]) => {
        this.counts = {
          utilisateurs: users.utilisateurs || 0,
          voitures: cars.voitures || 0,
          categories: categories.category || 0,
          clients: clients.client || 0,
          factures: rentals.facture || 0
        };
        this.loading = false;
        console.log('Counts chargés:', this.counts); // ← POUR VÉRIFIER
      },
      error: (err) => {
        console.error('Erreur chargement counts:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }
}