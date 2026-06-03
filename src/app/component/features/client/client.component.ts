import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ClientService, ClientDto } from './client.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import Swal from 'sweetalert2';
import { SearchBarService } from '../../dasbord/searchBar/searchBar.service';
@Component({
  selector: 'app-client',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './client.component.html'
})
export class ClientComponent {
  darkMode = false;
  clients: ClientDto[] = [];
  clientName: string = '';
  clientTelephone: string = '';
  clientAdresse: string = '';
  clientId: number | null = null;
  selectedClient: ClientDto | null = null;
  showModal = false;
  page = 1;
  totalPages = 1;
  loading = false;
  query = ''; // ⚡ valeur de recherche partagée
  constructor(
    private clientService: ClientService,
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
      this.loadClients();
    });
  
    this.loadClients();
  }

  get isEdit(): boolean {
    return this.clientId !== null;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  
  loadClients() {
    this.loading = true;

  
    const obs = this.query && this.query.trim() !== ''
      ? this.clientService.searchClient(this.query, this.page, 5)
      : this.clientService.getPaged(this.page, 5);
  
    obs.subscribe({
      next: (res) => {
        this.clients = res.items;
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

  submit() {
    if (!this.clientName || !this.clientAdresse || !this.clientTelephone) {
      Swal.fire('Champs obligatoires', 'Veuillez remplir tous les champs', 'warning');
      return;
    }

    const dto: Partial<ClientDto> = {
      nom: this.clientName,
      telephone: this.clientTelephone,
      adresse: this.clientAdresse
    };

    if (this.isEdit) {
      this.clientService.update(this.clientId!, dto).subscribe({
        next: () => {
          Swal.fire('Succès', 'Client modifié', 'success');
          this.resetForm();
          this.loadClients();
        },
        error: () => Swal.fire('Erreur', 'Impossible de modifier le client', 'error')
      });
    } else {
      this.clientService.create(dto).subscribe({
        next: () => {
          Swal.fire('Succès', 'Client ajouté', 'success');
          this.resetForm();
          this.loadClients();
        },
        error: () => Swal.fire('Erreur', 'Impossible d’ajouter le client', 'error')
      });
    }
  }

  edit(client: ClientDto) {
    this.clientId = client.id;
    this.clientName = client.nom;
    this.clientAdresse = client.adresse;
    this.clientTelephone = client.telephone;
  }

  delete(client: ClientDto) {
    Swal.fire({
      title: `Supprimer "${client.nom}" ?`,
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.clientService.delete(client.id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Client supprimé', 'success');
            this.loadClients();
          },
          error: () => Swal.fire('Erreur', 'Impossible de supprimer le client', 'error')
        });
      }
    });
  }

  showDetails(client: ClientDto) {
    this.selectedClient = client;
    this.showModal = true;
  }

  resetForm() {
    this.clientId = null;
    this.clientName = '';
    this.clientAdresse = '';
    this.clientTelephone = '';
  }

  changePage(p: number) {
    this.page = p;
    this.loadClients();
  }
}
