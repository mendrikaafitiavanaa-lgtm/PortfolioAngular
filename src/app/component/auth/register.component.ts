import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RegisterService } from './register.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true;
  selectedPhoto?: File;

  constructor(private fb: FormBuilder, private registerService: RegisterService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      photo: [null] // champ optionnel
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onFileSelected(event: any) {
    this.selectedPhoto = event.target.files[0];
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { nom, password } = this.form.value;
    this.registerService.register(nom!, password!, this.selectedPhoto).subscribe({
      next: (data) => {
        Swal.fire('Succès', 'Création réussie', 'success');
        this.router.navigate(['/login']);
      },
      error: () => Swal.fire('Erreur', 'Identifiants incorrects', 'error')
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
