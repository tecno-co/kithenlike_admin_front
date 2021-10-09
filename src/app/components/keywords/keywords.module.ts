import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeywordsRoutingModule } from './keywords-routing.module';
import { KeywordsComponent } from './keywords.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    KeywordsComponent,
  ],
  imports: [
    CommonModule,
    KeywordsRoutingModule,
    CommonModule,
    RouterModule,
    AngularMaterialModule,
    SharedModule
  ]
})
export class KeywordsModule { }
