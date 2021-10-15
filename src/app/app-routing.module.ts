import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ThemesResolver } from './components/themes/guards/themes.resolver';
import { AuthGuard } from './auth/auth.guard';
import { KeywordsResolver } from './components/keywords/guards/keywords.resolver';
import { SeasonsResolver } from './components/seasons/guards/seasons.resolver';
import { DesignsResolver } from './components/designs/guards/designs.resolver';
import { KeywordsListResolver } from './components/designs/guards/keywords-list.resolver';
import { SeasonsListResolver } from './components/designs/guards/seasons-list.resolver';
import { MenuResolver } from './components/pages/guards/menu.resolver';

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
    path: 'home',
    canActivate: [AuthGuard],
    component: DashboardComponent
  },
  { 
    path: 'app',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'designs',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/designs/designs.module').then(m => m.MasterBaseModule),
    resolve: {
      designsResolver: DesignsResolver,
      keywordsListResolver: KeywordsListResolver,
      seasonsListResolver: SeasonsListResolver
      }
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule)
  },
  {
    path: 'seasons',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/seasons/seasons.module').then(m => m.SeasonsModule),
    resolve: {seasonsResolver: SeasonsResolver}
  },
  { 
    path: 'themes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/themes/themes.module').then(m => m.ThemesModule),
    resolve: {themesResolver: ThemesResolver}
  },
  { path: 'keywords',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/keywords/keywords.module').then(m => m.KeywordsModule),
    resolve: {keywordsResolver: KeywordsResolver}
  },
  { path: 'pages',
  canActivate: [AuthGuard],
  loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
  resolve: {menuResolver: MenuResolver}
},
] 

@NgModule({
  imports: [RouterModule.forRoot(
    routes,
    {
      relativeLinkResolution: 'legacy',
      useHash: true,
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
