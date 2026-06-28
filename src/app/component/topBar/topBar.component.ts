import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
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
    private store: Store<{ theme: ThemeState }>,
    private renderer: Renderer2,
    private el: ElementRef
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  ngOnInit(): void {}

  onToggle() {
    this.store.dispatch(toggleDarkMode());
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    if (this.isMenuOpen) {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(document.body, 'overflow');
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
    this.renderer.removeStyle(document.body, 'overflow');
  }

  // Nouvelle fonction pour fermer le menu et scroller vers la section
  closeMenuAndScroll(sectionId: string) {
    this.closeMenu();
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const topOffset = 80; // Hauteur de la topbar + padding
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - topOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  }
}