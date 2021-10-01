import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AngularTokenService, SignInData} from 'angular-token';

@Component({
  selector: 'app-login-b',
  templateUrl: './login-b.component.html',
  styleUrls: ['./login-b.component.scss']
})
export class LoginBComponent implements OnInit {

  @ViewChild('signInForm', { static: true })

  signInData: SignInData = <SignInData>{};
  output: any = {};
  
  constructor(private tokenService: AngularTokenService, private router: Router) { }
  

  login() {
    /*
    this.tokenService.signIn(this.signInData).subscribe(
      res => {
        this.output = res;
        console.log("CorrectResponse");
        console.log(this.output)
      }, error => {
        this.output = error;
        console.log("Error");
      }
    );*/
    this.router.navigate(['/home']);    
  }

  ngOnInit(): void {
  }

}
