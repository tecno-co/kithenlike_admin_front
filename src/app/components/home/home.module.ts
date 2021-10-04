import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { AngularMaterialModule } from '../shared/angular-material.module';

import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    //HomeComponent
  ],
  imports: [
    //HomeRoutingModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule,
  ],
  exports: [
  ]
})
export class HomeModule { }
