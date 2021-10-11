import { Component, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  
  isAuthenticated: boolean = false;

  public theme: boolean;

  constructor(
    public router:Router,
    private authService: AuthService
    ) {
      router.events.forEach((event) => {
        this.isAuthenticated = this.authService.isAuthenticated();
      });
      
      this.theme = localStorage.getItem('theme') == 'true';
  }

  onInit(){
  }

  toggleTheme(t: boolean) {
    this.theme = localStorage.getItem('theme') == 'true';
  }

}