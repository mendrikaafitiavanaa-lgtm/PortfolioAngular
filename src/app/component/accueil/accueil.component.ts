import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../api/theme.service';
import { LoadingComponent } from '../reutilisable/loading.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent], // ✅ pas de double virgule
  templateUrl: './accueil.component.html'
})
export class AccueilComponent {
  darkMode = false;
  loading = true; // au départ, on affiche le spinner
  currentImage = 'assets/photo1.jpg';

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });

    // Simule un chargement de 2 secondes
    setTimeout(() => {
      this.loading = false; // après 2s, on cache le spinner et on affiche le contenu
    }, 1000);
  }

  onMouseEnter() {
    this.currentImage = 'assets/photo2.jpg';
  }

  onMouseLeave() {
    this.currentImage = 'assets/photo1.jpg';
  }
}
