import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PermissionsRoutingModule } from './permissions-routing.module';
import { PermissionsComponent } from './permissions.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    PermissionsComponent
  ],
  imports: [
    CommonModule,
    PermissionsRoutingModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class PermissionsModule { }
