import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class CategoriesModule { }
