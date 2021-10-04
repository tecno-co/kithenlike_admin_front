import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-login-b',
  templateUrl: './login-b.component.html',
  styleUrls: ['./login-b.component.scss']
})
export class LoginBComponent implements OnInit {

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
