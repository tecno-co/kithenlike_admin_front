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
import { UsersResolver } from './components/users/guards/users.resolver';
import { CategoriesResolver } from './components/categories/guards/categories.resolver';
import { RolesResolver } from './components/roles/guards/roles.resolver';
import { RolesListResolver } from './components/users/guards/roles-list.resolver';
import { CategoriesListResolver } from './components/designs/guards/categories-list.resolver';
import { PermissionsMenuModulesResolver } from './components/permissions/guards/permissions-menu-modules.resolver';
import { PagePermissionsResolver } from './components/permissions/guards/page-permissions.resolver';
import { AllMenuPagesResolver } from './components/pages/guards/all-menu-pages.resolver';

const routes: Routes = [
  { 
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
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
    path: 'reset-password',
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
      categoriesListResolver: CategoriesListResolver
      }
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/settings/settings.module').then(m => m.SettingsModule),
    resolve: {themesResolver: ThemesResolver}
  },
  {
    path: 'seasons',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/seasons/seasons.module').then(m => m.SeasonsModule),
    resolve: {seasonsResolver: SeasonsResolver}
  },
  // { 
  //   path: 'themes',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./components/themes/themes.module').then(m => m.ThemesModule),
  //   resolve: {themesResolver: ThemesResolver}
  // },
  { path: 'keywords',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/keywords/keywords.module').then(m => m.KeywordsModule),
    resolve: {keywordsResolver: KeywordsResolver}
  },
  { path: 'pages',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/pages/pages.module').then(m => m.PagesModule),
    resolve: {
      menuResolver: MenuResolver,
      allMenuPagesResolver: AllMenuPagesResolver,
    }
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/users/users.module').then(m => m.UsersModule),
    resolve: {
      usersResolver: UsersResolver,
      rolesListResolver: RolesListResolver,
    }
  },
  {
    path: 'categories',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/categories/categories.module').then(m => m.CategoriesModule),
    resolve: {categoriesResolver: CategoriesResolver}
  },
  {
    path: 'roles',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/roles/roles.module').then(m => m.RolesModule),
    resolve: {rolesResolver: RolesResolver}
  },
  { path: 'permissions',
    canActivate: [AuthGuard],
    loadChildren: () => import('./components/permissions/permissions.module').then(m => m.PermissionsModule),
    resolve: {
      permissionsMenuModulesResolver: PermissionsMenuModulesResolver,
      pagePermissionsResolver: PagePermissionsResolver,
    }
  },
  // { path: 'password',
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./components/password/password.module').then(m => m.PasswordModule)
  // },
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
