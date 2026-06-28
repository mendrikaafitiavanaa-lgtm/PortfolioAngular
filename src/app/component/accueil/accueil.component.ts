import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../api/theme.service';
import { LoadingComponent } from '../reutilisable/loading.component';

@Component({
  selector: 'app-accueil',
  standalone: true,
  imports: [CommonModule, FormsModule, LoadingComponent],
  templateUrl: './accueil.component.html',
  encapsulation: ViewEncapsulation.None // Important pour éviter les conflits
})
export class AccueilComponent {
  darkMode = false;
  loading = true;
  currentImage = 'assets/photo1.jpg';

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  onMouseEnter() {
    this.currentImage = 'assets/photo2.jpg';
  }

  onMouseLeave() {
    this.currentImage = 'assets/photo1.jpg';
  }
}