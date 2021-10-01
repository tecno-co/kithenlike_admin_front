import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeasonsRoutingModule } from './seasons-routing.module';
import { SeasonsComponent } from './seasons.component';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SeasonsComponent,
  ],
  imports: [
    CommonModule,
    SeasonsRoutingModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule,
  ]
})
export class SeasonsModule { }
