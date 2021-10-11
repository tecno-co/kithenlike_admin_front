import { Component, OnInit, ViewChild, } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginData } from 'src/app/models/auth/auth';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.authService.signOut();
  }

  onLogin(signInData: any) {

    let loginData: LoginData = {email: signInData.login, password: signInData.password};
    this.authService.signIn(loginData)
      .subscribe(
        (res) => {
          
        }, error => {
          let message = this.getLoginError(error.statusText);
          this.openSnackBar(message, '', 1000);
        }
      )
  }

  getLoginError(error: string): string{
    var message: string = '';

    if (error == 'Unauthorized'){
      message ='Credenciales Incorrectas';
    }
    else {
      message ='Error desconocido';
    }

    return message;
  }

  openSnackBar(message: string, action: string, duration: number) {
    var panelClass = "error-snack-bar";
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
