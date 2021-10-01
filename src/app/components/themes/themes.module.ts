import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThemesRoutingModule } from './themes-routing.module';
import { ThemesComponent } from './themes.component';
import { ThemesFormComponent } from './themes-form/themes-form.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ThemesComponent,
    ThemesFormComponent
  ],
  imports: [
    CommonModule,
    ThemesRoutingModule,
    SharedModule
  ]
})
export class ThemesModule { }
