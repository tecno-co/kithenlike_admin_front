import { Component } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';
import { LoginComponent } from './components/login/login.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    
    public login: boolean = false;
    public reset: boolean = false;
    public menu: boolean = false;
    public navigationSubscription: any;
    public theme: boolean;

    constructor(public router:Router) {
        router.events.forEach((event) => {
            if(event instanceof NavigationStart) {
                if (event.url == "/login"){
                    this.login = true;
                    this.reset = false;
                    this.menu = false
                } else if (event.url == "/reset") {
                    this.reset = true;
                    this.login = false;
                    this.menu = false
                } else {
                    this.menu = true;
                    this.login = false;
                    this.reset = false;
                }
            }
          });
          this.theme = localStorage.getItem('theme') == 'true';
    }
    
    onInit(){
    }

    toggleTheme(t: boolean) {
        this.theme = localStorage.getItem('theme') == 'true';
    }
}
