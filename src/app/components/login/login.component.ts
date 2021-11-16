import { Component, OnDestroy, OnInit, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginData } from 'src/app/models/auth/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  suscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnDestroy(): void {
    if (this.suscription){ 
      this.suscription.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.suscription = this.authService.isAuthenticated()
    .subscribe((res) => {
        if (res) {
          this.ngOnDestroy();
          this.router.navigate(['/home']);
        }
      }
    )
  }

  onLogin(signInData: any) {

    let loginData: LoginData = {email: signInData.login, password: signInData.password};
    this.authService.signIn(loginData)
      .subscribe(
        (res) => {
          
        }, error => {
          this.showErrors(error.error.errors);          
        }
      )
  }

  showErrors(errors: string[]){
    for (let i=0; i<=errors.length-1; i++) {
      setTimeout(() => {this.openSnackBar(errors[i], '', 2000)}, 2000 * i);
    }
  }

  openSnackBar(message: string, action: string, duration: number) {
    var panelClass = "error-snack-bar";
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
