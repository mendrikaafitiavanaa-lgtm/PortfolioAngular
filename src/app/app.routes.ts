import { Routes } from '@angular/router';
import { DashboardAdminComponent } from './component/dasbord/dasbord.component';

export const routes: Routes = [
  { path: '', component: DashboardAdminComponent },
  { path: '**', redirectTo: '' }
];