import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ForgotService } from './sideBar.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sideBar.component.html'
})
export class SidebarComponent {
  darkMode = false;
  isOpen = true;
  openCategorie = false;
  openVoiture = false;
  openClient = false;
  openFacture = false;

  constructor(
    private forgotService: ForgotService,
    private router: Router,
    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  toggleMenu() { this.isOpen = !this.isOpen; }
  toggleCategorie() { this.openCategorie = !this.openCategorie; }
  toggleVoiture() { this.openVoiture = !this.openVoiture; }
  toggleClient() { this.openClient = !this.openClient; }
  toggleFacture() { this.openFacture = !this.openFacture; }

  logout() {
    Swal.fire({
      title: 'Voulez-vous vraiment quitter ?',
      text: 'Vous serez déconnecté de votre session.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, déconnecter',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.forgotService.deconnexion().subscribe({
          next: (res) => {
            Swal.fire('Succès', res, 'success');
            this.router.navigate(['/login']);
          },
          error: () => {
            Swal.fire('Erreur', 'Impossible de se déconnecter', 'error');
          }
        });
      }
    });
  }
}
