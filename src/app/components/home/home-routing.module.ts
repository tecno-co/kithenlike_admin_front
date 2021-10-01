import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeComponent } from './home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  /*
  { path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard'
  },

  { path: '',
    component: HomeComponent, children:
    [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'master', loadChildren: () => import('src/app/components/master-base/master-base.module').then(m => m.MasterBaseModule)},
      { path: 'settings', loadChildren: () => import('src/app/components/settings/settings.module').then(m => m.SettingsModule)},
    ]
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
