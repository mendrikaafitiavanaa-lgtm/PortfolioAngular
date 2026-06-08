import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-icons', // ✅ correspond au tag HTML
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scroll-icons.component.html'
})
export class ScrollIconsComponent {
  @Input() darkMode: boolean = false;
  showUp = false;

  @HostListener('window:scroll', [])
  onScroll() {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    this.showUp = scrollTop + windowHeight >= docHeight - 50;
  }

  scrollAction() {
    if (this.showUp) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  }
}
