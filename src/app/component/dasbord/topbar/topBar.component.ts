import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { MeService, UserResponse } from './topBar.service';
import { ThemeState, toggleDarkMode } from '../../../api/theme.service';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topBar.component.html'
})
export class TopbarComponent implements OnInit {
  darkMode = false;
  user?: UserResponse;

  constructor(
    private meService: MeService,
    private store: Store<{ theme: ThemeState }>
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  ngOnInit(): void {
    this.meService.me().subscribe({
      next: (res) => this.user = res,
      error: () => console.error('Impossible de récupérer l’utilisateur')
    });
  }

  onToggle() {
    this.store.dispatch(toggleDarkMode());
  }
}
