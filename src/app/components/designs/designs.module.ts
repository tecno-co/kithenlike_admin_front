import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignsRoutingModule } from './designs-routing.module';
import { DesignsComponent } from './designs.component';
import { AngularMaterialModule } from '../shared/angular-material.module';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    DesignsComponent,
    
  ],
  imports: [
    CommonModule,
    DesignsRoutingModule,
    AngularMaterialModule,
    SharedModule
  ],
})
export class MasterBaseModule { }
