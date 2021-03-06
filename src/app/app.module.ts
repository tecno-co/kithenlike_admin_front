import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetComponent } from './components/reset/reset.component';
import { LoginCComponent } from './components/login/login-c/login-c.component';
import { LoginBComponent } from './components/login/login-b/login-b.component';
import { LoginAComponent } from './components/login/login-a/login-a.component';
import { PieChartsComponent } from './components/shared/google-charts/pie-charts/pie-charts.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './components/shared/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/shared/shared.module';
import { MatButton } from '@angular/material/button';
import { DesignsFormComponent } from './components/designs/designs-form/designs-form.component';
import { SeasonsFormComponent } from './components/seasons/seasons-form/seasons-form.component';
import { KeywordsFormComponent } from './components/keywords/keywords-form/keywords-form.component';
import { UsersFormComponent } from './components/users/users-form/users-form.component';
import { CategoriesFormComponent } from './components/categories/categories-form/categories-form.component';
import { RolesFormComponent } from './components/roles/roles-form/roles-form.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MomentModule } from 'angular2-moment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PieChartsComponent,
    RegisterComponent,
    ResetComponent,
    LoginCComponent,
    LoginBComponent,
    LoginAComponent,
    DashboardComponent,
    DesignsFormComponent,
    SeasonsFormComponent,
    KeywordsFormComponent,
    UsersFormComponent,
    CategoriesFormComponent,
    RolesFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    NgIdleKeepaliveModule.forRoot(),
    MomentModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatButton]
})
export class AppModule { }
