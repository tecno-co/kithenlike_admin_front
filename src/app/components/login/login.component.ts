import { Component, OnInit, ViewChild, } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService, SignInData } from 'angular-token';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @ViewChild('signInForm', { static: true })

  signInData: SignInData = <SignInData>{};
  output: any = {};

  constructor(private tokenService: AngularTokenService, private router: Router) {}

  login(signIn: any) {
    // console.log(signIn)
    /*
      this.output = {};
      console.log(this.signInData.login);
      console.log(this.signInData.password);

      let loginData: SignInData = {login: this.signInData.login, password: this.signInData.password}
      this.tokenService.signIn(loginData).subscribe(
          res => {
              this.output = res;
              console.log(this.output);
              //this.router.navigate(['/home']);
          }, error => {
              this.output = error;   
          }
      )*/
      // this.router.navigate(['/home']);
  }

  ngOnInit(): void {
  }

}
