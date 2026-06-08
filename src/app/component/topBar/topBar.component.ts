import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { ThemeState, toggleDarkMode } from '../../api/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topBar.component.html'
})
export class TopbarComponent implements OnInit {
  darkMode = false;
 
  isMenuOpen = false;

  constructor(

    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
        this.darkMode = state.darkMode;
      });
  }

  ngOnInit(): void {
    
  }

  onToggle() {
    this.store.dispatch(toggleDarkMode());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
}
