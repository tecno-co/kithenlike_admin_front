import { NgModule } from "@angular/core";

import { DynamicTableComponent } from "./dynamic-table/dynamic-table.component";
import { MenuAComponent } from "./menu-a/menu-a.component";


// MATERIAL
import { RouterModule } from "@angular/router";
import { AngularMaterialModule } from "./angular-material.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProfileCircleComponent } from './profile-circle/profile-circle.component';
import { MenuBComponent } from "./menu-b/menu-b.component";
import { BannerComponent } from './banner/banner.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { ExpirationWarningComponent } from './expiration-warning/expiration-warning.component';

const COMPONENTS = [
  MenuAComponent,
  MenuBComponent,
  DynamicTableComponent,
  ProfileCircleComponent,
  BannerComponent
];

@NgModule({
    declarations: [
      COMPONENTS,
      AlertDialogComponent,
      ExpirationWarningComponent,
    ],
    imports: [
      CommonModule,
      RouterModule,
      AngularMaterialModule,
      ReactiveFormsModule,
      FormsModule      
    ],
    exports: [
      COMPONENTS,
      AngularMaterialModule,
    ]
  })
  export class SharedModule { }
  