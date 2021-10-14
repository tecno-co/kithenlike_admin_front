import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  showFiller = false;
  output: any;

  @Output() theme: EventEmitter<boolean> = new EventEmitter();
  private currentTheme: boolean;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) {
    this.currentTheme = localStorage.getItem('theme') == 'true';
    this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

  logout() {
    this.authService.signOut().subscribe();
  }

  toggleTheme() {
    this.currentTheme = !this.currentTheme;
    localStorage.setItem('theme', this.currentTheme.toString());
    this.theme.emit(this.currentTheme);
  }
}
