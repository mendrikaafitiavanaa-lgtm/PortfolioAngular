import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';   // ✅ pour ngClass
import { FormsModule } from '@angular/forms';     // ✅ pour ngModel et ngForm
import emailjs from '@emailjs/browser';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../api/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,                 // ✅ composant standalone
  imports: [CommonModule, FormsModule], // ✅ modules intégrés
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  darkMode = false;
  formData = { name: '', email: '', title: '', message: '' };

  constructor(private store: Store<{ theme: ThemeState }>) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  sendEmail() {
    // Vérification des champs obligatoires
    if (!this.formData.name || !this.formData.email || !this.formData.title || !this.formData.message) {
      Swal.fire({
        icon: 'error',
        title: 'Champs obligatoires',
        text: 'Veuillez remplir tous les champs avant d’envoyer.'
      });
      return;
    }

    emailjs.send(
      'service_7sk70lf',     // 👉 Ton Service ID
      'template_dhi79bq',     // 👉 Ton Template ID
      this.formData,
      'qb7m2peflotbexjke'
    ).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Message envoyé',
        text: 'Votre message a été envoyé avec succès !'
      });
      this.formData = { name: '', email: '', title: '', message: '' };
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Erreur',
        text: 'Une erreur est survenue : ' + JSON.stringify(err)
      });
    });
  }
}
