import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarService, CarDto, CategoryDto } from './car.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import Swal from 'sweetalert2';
import { SearchBarService } from '../../dasbord/searchBar/searchBar.service';
@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './car.component.html'
})
export class CarComponent {
  darkMode = false;
  cars: CarDto[] = [];
  categories: CategoryDto[] = [];

  // 🔹 Champs recherche
  dateDebut: string = '';
  dateFin: string = '';

  // 🔹 Champs formulaire ajout/modif
  carName: string = '';
  disponible: boolean = true;
  photoFile: File | null = null;
  carId: number | null = null;
  categorieId: number | null = null;
  tarifJournalier: number | null = null;

  // 🔹 UI
  selectedCar: CarDto | null = null;
  showModal = false;       // modal détails
  showAddModal = false;    // modal ajout/modif
  page = 1;
  totalPages = 1;
  loading = false;
  query = ''; // ⚡ valeur de recherche partagée
  constructor(
    private carService: CarService,
    private store: Store<{ theme: ThemeState }>,
    private searchService: SearchBarService   // ⚡ ajouté
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }
 
  ngOnInit() {
    this.searchService.query$.subscribe(q => {
      this.query = q;
      this.page = 1;
      this.loadCars();
    });
  
    this.loadCars();
    this.loadCategories(); // 🔹 Ajout ici
  }
  

  // 🔹 Charger catégories
  loadCategories() {
    this.carService.getAllCategory().subscribe({
      next: (res) => this.categories = res,
      error: () => Swal.fire('Erreur', 'Impossible de charger les catégories', 'error')
    });
  }

  get isEdit(): boolean {
    return this.carId !== null;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  // 🔹 Charger toutes les voitures (pagination)
  loadCars() {
    this.loading = true;

  
    const obs = this.query && this.query.trim() !== ''
      ? this.carService.searchCar(this.query, this.page, 5)
      : this.carService.getPaged(this.page, 5);
  
    obs.subscribe({
      next: (res) => {
        this.cars = res.items;
        this.totalPages = Math.ceil(res.totalCount / res.pageSize);
        this.page = res.page;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erreur', 'Impossible de charger les voitures', 'error');
      }
    });
  }
  

  // 🔹 Charger voitures disponibles selon dates
  loadAvailableCars() {
    if (!this.dateDebut || !this.dateFin) {
      Swal.fire('Champs obligatoires', 'Veuillez choisir une date de début et une date de fin', 'warning');
      return;
    }

    this.loading = true;
    this.carService.GetAvailableCars(this.dateDebut, this.dateFin, this.page, 5).subscribe({
      next: (res) => {
        this.cars = res.items;
        this.totalPages = Math.ceil(res.totalCount / res.pageSize);
        this.page = res.page;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erreur', 'Impossible de charger les voitures disponibles', 'error');
      }
    });
  }

  // 🔹 Fichier photo
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) this.photoFile = file;
  }

  // 🔹 Ajouter / Modifier voiture
  submit() {
    if (!this.carName || !this.categorieId || !this.tarifJournalier || !this.photoFile) {
      Swal.fire('Champs obligatoires', 'Veuillez remplir tous les champs et choisir une photo', 'warning');
      return;
    }

    const formData = new FormData();
    formData.append('modele', this.carName);
    formData.append('disponible', String(this.disponible));
    formData.append('categorieId', String(this.categorieId!));
    formData.append('tarifJournalier', String(this.tarifJournalier!));
    formData.append('photo', this.photoFile);

    if (this.isEdit) {
      this.carService.update(this.carId!, formData).subscribe({
        next: () => {
          Swal.fire('Succès', 'Voiture modifiée', 'success');
          this.resetForm();
          this.showAddModal = false;
          this.loadCars();
        },
        error: () => Swal.fire('Erreur', 'Impossible de modifier la voiture', 'error')
      });
    } else {
      this.carService.create(formData).subscribe({
        next: () => {
          Swal.fire('Succès', 'Voiture ajoutée', 'success');
          this.resetForm();
          this.showAddModal = false;
          this.loadCars();
        },
        error: () => Swal.fire('Erreur', 'Impossible d’ajouter la voiture', 'error')
      });
    }
  }

  // 🔹 Edition
  edit(car: CarDto) {
    this.carId = car.id;
    this.carName = car.modele;
    this.tarifJournalier = car.tarifJournalier;
    this.categorieId = car.categorieId;
    this.disponible = car.disponible;
  }

  // 🔹 Suppression
  delete(car: CarDto) {
    Swal.fire({
      title: `Supprimer "${car.modele}" ?`,
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.carService.delete(car.id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Voiture supprimée', 'success');
            this.loadCars();
          },
          error: () => Swal.fire('Erreur', 'Impossible de supprimer la voiture', 'error')
        });
      }
    });
  }

  // 🔹 Détails
  showDetails(car: CarDto) {
    this.selectedCar = car;
    this.showModal = true;
  }

  // 🔹 Reset form
  resetForm() {
    this.carId = null;
    this.carName = '';
    this.tarifJournalier = null;
    this.categorieId = null;
    this.disponible = true;
    this.photoFile = null;
  }

  // 🔹 Pagination
  changePage(p: number) {
    this.page = p;
    this.loadCars();
  }
}
