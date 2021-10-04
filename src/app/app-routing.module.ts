import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  { 
    path: 'login',
    component: LoginComponent
  },
  { 
    path: 'register',
    component: RegisterComponent
  },
  { 
    path: 'reset',
    component: ResetComponent
  },
  { 
    path: 'dashboard',
    component: DashboardComponent
  },
  { 
    path: 'home',
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'diseños',
    loadChildren: () => import('./components/designs/designs.module').then(m => m.MasterBaseModule),
  },
  {
    path: 'ajustes',
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'temporadas',
    loadChildren: () => import('./components/seasons/seasons.module').then(m => m.SeasonsModule) },
  { 
    path: 'temas',
    loadChildren: () => import('./components/themes/themes.module').then(m => m.ThemesModule) },
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
