import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [CommonModule, NgxSpinnerModule], // ✅ directives Angular + ngx-spinner
  templateUrl: './loading.component.html'
})
export class LoadingComponent {
  @Input() loading: boolean = false;
  @Input() darkMode: boolean = false;
}
