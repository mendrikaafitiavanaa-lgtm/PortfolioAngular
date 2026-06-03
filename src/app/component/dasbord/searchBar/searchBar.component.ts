import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import { SearchBarService } from './searchBar.service';

@Component({
  selector: 'app-searchbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './searchbar.component.html'
})
export class SearchbarComponent {
  darkMode = false;
  type: string = 'facture';
  query: string = '';

  constructor(
    private store: Store<{ theme: ThemeState }>,
    private searchService: SearchBarService
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  onChange() {
    this.searchService.setQuery(this.query);
  }

  clearSearch() {
    this.query = '';
    this.searchService.clearQuery();
  }
}
