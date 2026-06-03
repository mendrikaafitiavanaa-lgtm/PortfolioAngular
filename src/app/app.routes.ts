import { Routes } from '@angular/router';
import { LoginComponent } from './component/auth/login.component';
import { RegisterComponent } from './component/auth/register.component';
import { DashboardAdminComponent } from './component/dasbord/dasbord-Admin/dasbordAdmin.component';
import { ForgotComponent } from './component/auth/forgot.component';
import { ResetComponent } from './component/auth/reset.component';
import { CategoryComponent } from './component/features/category/category.component';
import { CarComponent } from './component/features/car/car.component';
import { ClientComponent } from './component/features/client/client.component';
import { RentalComponent } from './component/features/Rental/rental.component';
import { FactureComponent } from './component/features/GereFacture/facture.component';
import { AccueilComponent } from './component/features/accueil/accueil.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotComponent },
  { path: 'reset', component: ResetComponent },
  {
    path: 'dashboard',
    component: DashboardAdminComponent,
    children: [
      {path:'',component:AccueilComponent},
      { path: 'category', component: CategoryComponent },
      { path: 'car', component: CarComponent },
      { path: 'facture', component: RentalComponent },
      { path: 'Gerefacture', component: FactureComponent },
      { path: 'client', component: ClientComponent }
    ]
  },
  { path: '**', redirectTo: 'login' } // ⚠️ toujours en dernier
];
