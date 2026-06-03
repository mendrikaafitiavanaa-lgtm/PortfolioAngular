import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LoginService } from './login.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  hidePassword = true; // mot de passe caché par défaut

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePassword() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { nom, password } = this.form.value;
    this.loginService.login(nom!, password!).subscribe({
      next: (data) => {
        Swal.fire('Succès', 'Connexion réussie', 'success');
        localStorage.setItem('token', data.token);
        this.router.navigate(['/dashboard']);
      },
      error: () => Swal.fire('Erreur', 'Identifiants incorrects', 'error')
    });
  }
goToRegister() {
  this.router.navigate(['/register']);
}
goToForgot() {
  this.router.navigate(['/forgot']);
}

}
