import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ThemesResolver } from './components/themes/guards/themes.resolver';
import { AuthGuard } from './auth/auth.guard';
import { KeywordsResolver } from './components/keywords/guards/keywords.resolver';
import { SeasonsResolver } from './components/seasons/guards/seasons.resolver';

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
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  { 
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'diseños',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/designs/designs.module').then(m => m.MasterBaseModule),
  },
  {
    path: 'ajustes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'temporadas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/seasons/seasons.module').then(m => m.SeasonsModule),
    resolve: {seasonsResolver: SeasonsResolver}
  },
  { 
    path: 'temas',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/themes/themes.module').then(m => m.ThemesModule),
    resolve: {themesResolver: ThemesResolver}
  },
  { path: 'palabras-clave',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/keywords/keywords.module').then(m => m.KeywordsModule),
    resolve: {keywordsResolver: KeywordsResolver}
  },
] 

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
