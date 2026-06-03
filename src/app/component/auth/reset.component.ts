import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ResetService } from './reset.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './reset.component.html'
})
export class ResetComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private resetService: ResetService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { nom, newPassword } = this.form.value;
    this.resetService.reset(nom, newPassword).subscribe({
      next: () => {
        Swal.fire('Succès', 'Mot de passe réinitialisé', 'success');
        this.router.navigate(['/login']); // après reset, on va au login
      },
      error: () => Swal.fire('Erreur', 'Utilisateur introuvable', 'error')
    });
  }

  goTologin() {
    this.router.navigate(['/login']);
  }
}
