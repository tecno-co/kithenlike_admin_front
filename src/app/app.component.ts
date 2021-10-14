import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isAuthenticated$: Observable<boolean>;

  public theme: boolean;

  constructor(
    public router:Router,
    private authService: AuthService
    ) {
      this.theme = localStorage.getItem('theme') == 'true';
      this.isAuthenticated$ = this.authService.isAuthenticated();
  }

  onInit(){
  }

  toggleTheme(t: boolean) {
    this.theme = localStorage.getItem('theme') == 'true';
  }

}