import { HttpResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AngularTokenService, SignInData} from 'angular-token';


@Component({
    selector: 'app-login-a',
    templateUrl: './login-a.component.html',
    styleUrls: ['./login-a.component.scss']
})
export class LoginAComponent implements OnInit {

  @ViewChild('signInForm', { static: true })

  signInData: SignInData = <SignInData>{};
  output: any = {};

  constructor(
    private tokenService: AngularTokenService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  login() {
    this.output = {};
    let loginData: SignInData = {login: this.signInData.login, password: this.signInData.password}
    this.tokenService.signIn(loginData).subscribe(
        (res) => {
            // this.output = res;
            // console.log(this.tokenService.currentAuthData);
            console.log(res);
            this.router.navigate(['/home']);

        }, error => {
            this.output = error;
            let message = this.getLoginError(error.statusText);
            this.openSnackBar(message, '', 1000)
        }
    )
  }

  ngOnInit(): void {
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
