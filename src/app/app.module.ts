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

import { AngularTokenModule, AngularTokenOptions, AngularTokenService } from 'angular-token';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AngularMaterialModule } from './components/shared/angular-material.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from './components/shared/shared.module';
import { MatButton } from '@angular/material/button';
import { DesignsFormComponent } from './components/designs/designs-form/designs-form.component';
import { SeasonsFormComponent } from './components/seasons/seasons-form/seasons-form.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularTokenModule.forRoot({
      apiBase: 'http://localhost:3000',
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AngularMaterialModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [],
  providers: [AngularTokenModule],
  bootstrap: [AppComponent],
  entryComponents: [MatButton]
})
export class AppModule { }
