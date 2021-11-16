import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth/auth.service';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { MatDialog } from '@angular/material/dialog';
import { ExpirationWarningComponent } from './components/shared/expiration-warning/expiration-warning.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  isAuthenticated$: Observable<boolean>;

  idleState = 'Not started.';
  timedOut = false;
  lastPing!: Date;
  title = 'angular-idle-timeout';
  timeExpiration = 900;
  timeWarning = 300;

  public theme: boolean;

  constructor(
    public router:Router,
    private authService: AuthService,
    private idle: Idle,
    private keepalive: Keepalive,
    public dialog: MatDialog,
    ) {      
      this.theme = localStorage.getItem('theme') == 'true';
      this.isAuthenticated$ = this.authService.isAuthenticated();      

      this.idle.setIdle(this.timeExpiration);
      this.idle.setTimeout(this.timeWarning);
      this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

      this.idle.onIdleEnd.subscribe(() => {
        this.idleState = 'No longer idle.';
        this.reset();
      });
      
      this.idle.onTimeout.subscribe(() => {
        this.idleState = 'Timed out!';
        this.timedOut = true;
        this.authService.signOut().subscribe();
      });
      
      this.idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
      });
    
      this.idle.onTimeoutWarning.subscribe((countdown) => {
        this.idleState = 'You will time out in ' + countdown + ' seconds!'
        if(countdown == this.timeWarning) {
          const dialogRef = this.dialog.open(ExpirationWarningComponent, {
            width: '600px',
            data: {
              time: this.timeWarning
            }
          });
          dialogRef.componentInstance.emitClose.subscribe(res => {
            dialogRef.close();
            if (!res) {
              setTimeout(() => {
                this.authService.signOut().subscribe();
              }, 1000);
            }
          });
        }  
      });
      
      // sets the ping interval to 15 seconds
      this.keepalive.interval(15);
      this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

      this.isAuthenticated$.subscribe(isAuth => {
        if (isAuth) {
          idle.watch()
          this.timedOut = false;
        } else {
          idle.stop();
        }
      });      
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  toggleTheme(t: boolean) {
    this.theme = localStorage.getItem('theme') == 'true';
  }
}