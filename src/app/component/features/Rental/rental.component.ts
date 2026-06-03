import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RentalService, ClientDto, CarDto, RentalRequestDto, RentalItemDto } from './rental.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rental',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rental.component.html'
})
export class RentalComponent implements OnInit {
  clients: ClientDto[] = [];
  cars: CarDto[] = [];

  selectedClientId!: number;
  rentals: RentalItemDto[] = [];
  factureId: number | null = null;

  darkMode = false;

  constructor(
    private rentalService: RentalService,
    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  ngOnInit(): void {
    this.rentalService.getAllClient().subscribe({ next: (data) => this.clients = data });
    this.rentalService.getAllCar().subscribe({ next: (data) => this.cars = data });
  }

  ajouterLigne() {
    const defaultCarId = this.cars.length > 0 ? this.cars[1].id : 0;
  
    // Vérification : est-ce que ce carId est déjà choisi ?
    const dejaChoisi = this.rentals.some(r => r.carId === defaultCarId);
  
    if (dejaChoisi) {
      Swal.fire('❌ Erreur', 'Impossible de choisir deux fois le même modèle de voiture', 'error');
      return;
    }
  
    this.rentals.push({ carId: defaultCarId, dateDebut: '', dateFin: '' });
  }
  

  supprimerLigne(index: number) {
    this.rentals.splice(index, 1);
  }

  getTarif(carId: number | string): number {
    const id = Number(carId);
    const car = this.cars.find(c => c.id === id);
    return car ? car.tarifJournalier : 0;
  }

  get montantTotal(): number {
    return this.rentals.reduce((acc, rental) => acc + this.calculLigne(rental), 0);
  }

  calculLigne(rental: RentalItemDto): number {
    const car = this.cars.find(c => c.id === Number(rental.carId));
    if (car && rental.dateDebut && rental.dateFin) {
      const days = (new Date(rental.dateFin).getTime() - new Date(rental.dateDebut).getTime()) / (1000*60*60*24) + 1;
      if (days > 0) {
        return days * car.tarifJournalier;
      }
    }
    return 0;
  }

  // ✅ Harmonisation du format des dates avant envoi
  private formatRentals(): RentalItemDto[] {
    return this.rentals.map(r => ({
      carId: r.carId,
      dateDebut: r.dateDebut ? new Date(r.dateDebut).toISOString().split('T')[0] : '',
      dateFin: r.dateFin ? new Date(r.dateFin).toISOString().split('T')[0] : ''
    }));
  }

  createInvoice() {
    // Vérification doublons
    const carIds = this.rentals.map(r => r.carId);
    const doublon = carIds.some((id, idx) => carIds.indexOf(id) !== idx);
  
    if (doublon) {
      Swal.fire('❌ Erreur', 'Vous avez choisi deux fois le même modèle de voiture', 'error');
      return;
    }
  
    const dto: RentalRequestDto = { clientId: this.selectedClientId, rentals: this.formatRentals() };
    this.rentalService.createDynamic(dto).subscribe({
      next: (res) => {
        console.log("Réponse backend:", res);
        this.factureId = res.id ?? res.Id;
        Swal.fire('✅ Succès', 'Facture créée avec succès', 'success');
      },
      error: (err) => Swal.fire('❌ Erreur', err.error?.message || 'Échec création facture', 'error')
    });
  }
    printInvoice() {
    if (!this.factureId) return;
    this.rentalService.FactureInvoiceById(this.factureId).subscribe({
      next: (res) => {
        // ✅ Si ton backend renvoie un PDF en base64 ou blob
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // ouvre le PDF dans une nouvelle fenêtre
      },
      error: (err) => Swal.fire('❌ Erreur', err.error?.message || 'Échec impression facture', 'error')
    });
  }
  

  updateInvoice() {
    if (!this.factureId) return;
    const dto: RentalRequestDto = { clientId: this.selectedClientId, rentals: this.formatRentals() };
    this.rentalService.updateDynamic(this.factureId, dto).subscribe({
      next: (res) => {
        console.log("Réponse backend:", res);
        Swal.fire('✅ Succès', 'Facture mise à jour', 'success');
      },
      error: (err) => Swal.fire('❌ Erreur', err.error?.message || 'Échec update facture', 'error')
    });
  }
}
