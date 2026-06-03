import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService, CategoryDto } from './category.service';
import { Store } from '@ngrx/store';
import { ThemeState } from '../../../api/theme.service';
import Swal from 'sweetalert2';
import { SearchBarService } from '../../dasbord/searchBar/searchBar.service';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  darkMode = false;
  categories: CategoryDto[] = [];
  categoryName: string = '';
  categoryId: number | null = null;
  selectedCategory: CategoryDto | null = null;
  showModal = false;
  page = 1;
  totalPages = 1;
  loading = false;
  query = ''; // ⚡ valeur de recherche partagée

  constructor(
    private categoryService: CategoryService,
    private store: Store<{ theme: ThemeState }>,
    private searchService: SearchBarService
  ) {
    this.store.select('theme').subscribe(state => {
      this.darkMode = state.darkMode;
    });
  }

  ngOnInit() {
    // ⚡ écoute la valeur de recherche partagée
    this.searchService.query$.subscribe(q => {
      this.query = q;
      this.page = 1;
      this.loadCategories();
    });

    this.loadCategories();
  }

  get isEdit(): boolean {
    return this.categoryId !== null;
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  loadCategories() {
    this.loading = true;
  
    const obs = this.query && this.query.trim() !== ''
      ? this.categoryService.searchCategory(this.query, this.page, 5)
      : this.categoryService.getPaged(this.page, 5);
  
    obs.subscribe({
      next: (res) => {
        // ⚡ Debug Postman dans console
        this.categories = res.items;
        this.totalPages = Math.ceil(res.totalCount / res.pageSize);
        this.page = res.page;
        this.loading = false;
      },
      error: () => {
        this.loading = false;
        Swal.fire('Erreur', 'Impossible de charger les catégories', 'error');
      }
    });
  }
  
  

  // ⚡ Méthodes CRUD
  submit() {
    if (!this.categoryName) {
      Swal.fire('Champs obligatoires', 'Veuillez entrer un nom de catégorie', 'warning');
      return;
    }

    if (this.isEdit) {
      this.categoryService.update(this.categoryId!, { nom: this.categoryName }).subscribe({
        next: () => {
          Swal.fire('Succès', 'Catégorie modifiée', 'success');
          this.resetForm();
          this.loadCategories();
        },
        error: () => Swal.fire('Erreur', 'Impossible de modifier la catégorie', 'error')
      });
    } else {
      this.categoryService.create(this.categoryName).subscribe({
        next: () => {
          Swal.fire('Succès', 'Catégorie ajoutée', 'success');
          this.resetForm();
          this.loadCategories();
        },
        error: () => Swal.fire('Erreur', 'Impossible d’ajouter la catégorie', 'error')
      });
    }
  }

  resetForm() {
    this.categoryId = null;
    this.categoryName = '';
  }

  showDetails(cat: CategoryDto) {
    this.selectedCategory = cat;
    this.showModal = true;
  }

  edit(cat: CategoryDto) {
    this.categoryId = cat.id;
    this.categoryName = cat.nom;
  }

  delete(cat: CategoryDto) {
    Swal.fire({
      title: `Supprimer "${cat.nom}" ?`,
      text: 'Cette action est irréversible',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer',
      cancelButtonText: 'Annuler'
    }).then(result => {
      if (result.isConfirmed) {
        this.categoryService.delete(cat.id).subscribe({
          next: () => {
            Swal.fire('Succès', 'Catégorie supprimée', 'success');
            this.loadCategories();
          },
          error: () => Swal.fire('Erreur', 'Impossible de supprimer la catégorie', 'error')
        });
      }
    });
  }

  changePage(p: number) {
    this.page = p;
    this.loadCategories();
  }
}
