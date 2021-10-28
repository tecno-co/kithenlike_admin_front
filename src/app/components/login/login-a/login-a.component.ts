import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-a',
    templateUrl: './login-a.component.html',
    styleUrls: ['./login-a.component.scss']
})
export class LoginAComponent implements OnInit {

  @Output() login = new EventEmitter<any>();

  loginForm: FormGroup;
  hidePassword: boolean = true;

  output: any = {};

  constructor(
    private fb: FormBuilder
  ) {
    this.loginForm = new FormGroup({
      login: new FormControl('', Validators.required),
      password:  new FormControl(''),
    });
  }

  ngOnInit(): void {
  }

  onLogin() {
    this.login.emit(this.loginForm.value);
  }
}
