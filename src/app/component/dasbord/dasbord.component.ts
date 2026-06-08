import { Component ,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../topBar/topBar.component';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../api/theme.service';
import * as AOS from 'aos';
// ⚠️ Importer tous les composants enfants
import { AccueilComponent } from '../accueil/accueil.component';
import { CompetenceComponent } from '../competence/competence.component';
import { ProjetComponent } from '../projet/projet.component';
import { ContactComponent } from '../contact/contact.component';
import { ScrollIconsComponent } from '../reutilisable/scroll-icons.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    CommonModule,
    TopbarComponent,
    AccueilComponent,
    CompetenceComponent,
    ProjetComponent,
    ContactComponent,
    ScrollIconsComponent
  ],
  templateUrl: './dasbord.component.html'
})
export class DashboardAdminComponent {
  darkMode = false;
  ngOnInit() {
    AOS.init();
  }
  constructor(private store: Store<{ theme: ThemeState }>) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }
}
