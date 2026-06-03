import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FactureService, InvoiceDto } from './facture.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import Swal from 'sweetalert2';
import { SearchBarService } from '../../dasbord/searchBar/searchBar.service';
@Component({
  selector: 'app-facture',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facture.component.html',
})
export class FactureComponent {
  darkMode = false;
  factures: InvoiceDto[] = [];
 
  // ✅ nouvelle propriété pour les voitures
  ClientNom: string = '';
  clientTelephone: string = '';
  clientAdresse: string = '';
  MontantTotal: number | null = null;
  factureId: number | null = null;
  clientId: number | null = null;
  selectedFacture: InvoiceDto | null = null;
  showModal = false;
  page = 1;
  totalPages = 1;
  loading = false;
  query = ''; // ⚡ valeur de recherche partagée
  constructor(
    private factureService: FactureService,
    private searchService: SearchBarService ,  // ⚡ ajouté
    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
   
  }
  ngOnInit() {
    this.searchService.query$.subscribe(q => {
      this.query = q;
      this.page = 1;
      this.loadfactures();
    });
  
    this.loadfactures();
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

 
  loadfactures() {
    this.loading = true;

  
    const obs = this.query && this.query.trim() !== ''
      ? this.factureService.searchFacture(this.query, this.page, 5)
      : this.factureService.GetAllInvoices(this.page, 5);
  
    obs.subscribe({
      next: (res) => {
        this.factures = res.items;
        this.totalPages = Math.ceil(res.totalCount / res.pageSize);
        this.page = res.page;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erreur', 'Impossible de charger les voitures', 'error');
      }
    });
  }

  delete(facture: InvoiceDto) {
    Swal.fire({
      title: `Supprimer "${facture.clientNom}" ?`,
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.factureService.delete(facture.id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Facture supprimée', 'success');
            this.loadfactures();
          },
          error: () => Swal.fire('Erreur', 'Impossible de supprimer la facture', 'error')
        });
      }
    });
  }

  showDetails(facture: InvoiceDto) {
    this.selectedFacture = facture;
    this.showModal = true;
  }

  printInvoice() {
    if (!this.factureId) return;
    this.factureService.FactureInvoiceById(this.factureId).subscribe({
      next: (res) => {
        // ✅ Si ton backend renvoie un PDF en base64 ou blob
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        window.open(url); // ouvre le PDF dans une nouvelle fenêtre
      },
      error: (err) => Swal.fire('❌ Erreur', err.error?.message || 'Échec impression facture', 'error')
    });
  }

  changePage(p: number) {
    this.page = p;
    this.loadfactures();
  }
}
