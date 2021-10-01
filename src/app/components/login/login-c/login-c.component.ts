import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularTokenService, SignInData} from 'angular-token';

@Component({
  selector: 'app-login-c',
  templateUrl: './login-c.component.html',
  styleUrls: ['./login-c.component.scss']
})
export class LoginCComponent implements OnInit {

  @ViewChild('signInForm', { static: true })

  signInData: SignInData = <SignInData>{};
  output: any = {};
  
  constructor(private tokenService: AngularTokenService) { }
  

  login() {

    this.tokenService.signIn(this.signInData).subscribe(
      
      res => {
        this.output = res;
        console.log("CorrectResponse");
        console.log(this.output)
        //this.signInForm.resetForm();
      }, error => {
        this.output = error;
        console.log("Error");
        //this.signInForm.resetForm();

      }
    );       
  }

  ngOnInit(): void {
  }

}
