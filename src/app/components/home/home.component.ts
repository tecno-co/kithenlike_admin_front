import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  showFiller = false;
  output: any;
  loading = false;
  selectedMenu = 1;

  @Output() themeEmmiter: EventEmitter<boolean> = new EventEmitter();
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private mainService: MainService
  ) {}

  ngOnInit(): void {
    this.mainService.loadingEmmiter.subscribe((res: boolean) =>
      this.loading = res
    )
  }

  logout() {
    this.authService.signOut().subscribe();
  }

  setTheme() {
    let currentTheme =  localStorage.getItem('theme')!;
    if (currentTheme.includes('dark')) {
      currentTheme = currentTheme.replace('dark', 'light');
    } else {
      currentTheme = currentTheme.replace('light', 'dark');
    }
    localStorage.setItem('theme', currentTheme);
    this.themeEmmiter.emit();
  }
}
