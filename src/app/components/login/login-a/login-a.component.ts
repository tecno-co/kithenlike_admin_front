import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';

@Component({
    selector: 'app-login-a',
    templateUrl: './login-a.component.html',
    styleUrls: ['./login-a.component.scss']
})
export class LoginAComponent implements OnInit {

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
