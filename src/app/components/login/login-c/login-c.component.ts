import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { AngularTokenService, SignInData} from 'angular-token';

@Component({
  selector: 'app-login-c',
  templateUrl: './login-c.component.html',
  styleUrls: ['./login-c.component.scss']
})
export class LoginCComponent implements OnInit {

  @Output() login = new EventEmitter<any>();

  @ViewChild('signInForm', { static: true })

  signInData!: any;
  output: any = {};
  
  constructor() {}

  ngOnInit(): void {
  }

  onLogin() {
    this.login.emit(this.signInData);
  }  
}
