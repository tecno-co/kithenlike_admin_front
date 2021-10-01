import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService } from 'angular-token';

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
    private tokenService: AngularTokenService,
  ) {
    this.currentTheme = localStorage.getItem('theme') == 'true';
    this.router.navigate(['/dashboard']);    
  }

  ngOnInit(): void {
  }

  logout() {
    this.output = null;

    this.tokenService.signOut().subscribe(
      res => this.output      = res,
      error => this.output    = error
    );
    this.router.navigate(['/login']);
  }

  toggleTheme() {
    this.currentTheme = !this.currentTheme;
    localStorage.setItem('theme', this.currentTheme.toString());
    this.theme.emit(this.currentTheme);
  }
}
