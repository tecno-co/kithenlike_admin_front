import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KeywordsRoutingModule } from './keywords-routing.module';
import { KeywordsComponent } from './keywords.component';


@NgModule({
  declarations: [
    KeywordsComponent
  ],
  imports: [
    CommonModule,
    KeywordsRoutingModule
  ]
})
export class KeywordsModule { }
