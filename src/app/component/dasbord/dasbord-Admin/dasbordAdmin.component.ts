import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../sidebar/sideBar.component';
import { TopbarComponent } from '../topbar/topBar.component';
import { SearchbarComponent } from '../searchBar/searchBar.component';
import { Store } from '@ngrx/store';
import { ThemeState, toggleDarkMode } from '../../../api/theme.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SidebarComponent, TopbarComponent, SearchbarComponent],
  templateUrl: './dasbordAdmin.component.html'
})
export class DashboardAdminComponent {
  darkMode = false;
  showSearchBar = false; // ⚡ par défaut masquée

  constructor(
    private store: Store<{ theme: ThemeState }>,
    private router: Router
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });

    // ⚡ écoute les changements de route
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Liste des routes où la Searchbar doit apparaître
        const routesWithSearch = ['/car', '/category', '/Gerefacture','/client'];

        // Afficher uniquement si la route actuelle est dans la liste
        this.showSearchBar = routesWithSearch.some(route =>
          event.urlAfterRedirects.includes(route)
        );
      }
    });
  }

  toggleDarkMode() {
    this.store.dispatch(toggleDarkMode());
  }
}
