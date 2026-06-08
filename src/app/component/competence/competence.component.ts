import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../api/theme.service';
import { CommonModule } from '@angular/common';   // ✅ pour ngClass
import { FormsModule } from '@angular/forms';     // ✅ pour ngModel et ngForm
@Component({
  selector: 'app-competence',
  standalone: true,                 // ✅ composant standalone
  imports: [CommonModule, FormsModule], // ✅ modules intégrés
  templateUrl: './competence.component.html'
})
export class CompetenceComponent {
  darkMode = false;

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }
}
