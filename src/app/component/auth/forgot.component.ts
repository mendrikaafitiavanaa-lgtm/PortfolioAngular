import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ForgotService } from './forgot.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forgot.component.html'
})
export class ForgotComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private forgotService: ForgotService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      nom: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.form.invalid) return;
    const { nom } = this.form.value;
    this.forgotService.login(nom!).subscribe({
      next: (data) => {
        Swal.fire('Succès', data, 'success'); // data est une string
        this.router.navigate(['/reset']);
      },
      error: () => Swal.fire('Erreur', 'Utilisateur introuvable', 'error')
    });
  }
  goToLogin() {
    this.router.navigate(['/login']);
  }
}
