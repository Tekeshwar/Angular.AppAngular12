import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guard/auth.guard';
import { role } from 'src/app/models/roles';
import { AboutComponent } from './components/about/about.component';
import { AdminDeshboardComponent } from './components/admin-deshboard/admin-deshboard.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { ServicesComponent } from './components/services/services.component';

const routes: Routes = [
  {
    path: '',
    component: AdminDeshboardComponent,
    children: [
      { path: 'home', component: HomeComponent, },
      { path: 'about', component: AboutComponent },
      { 
        path: 'services', component: ServicesComponent,
        canActivate:[AuthGuard],
        data: { roles: [role.Admin] }
       },
      { path: 'contact', component: ContactComponent },
      { path: '', redirectTo: '/admin/home', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
