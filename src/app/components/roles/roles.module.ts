import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolesRoutingModule } from './roles-routing.module';
import { RolesComponent } from './roles.component';
import { RolesFormComponent } from './roles-form/roles-form.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RolesComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class RolesModule { }
