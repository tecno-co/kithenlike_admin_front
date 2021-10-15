import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { PagesFormComponent } from './pages-form/pages-form.component';
import { ModuleFormComponent } from './module-form/module-form.component';


@NgModule({
  declarations: [
    PagesComponent,
    PagesFormComponent,
    ModuleFormComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PagesModule { }
