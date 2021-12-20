import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {

  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [ 
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=#@$!%*?&]).{1,}')])

  confirmPasswordControl = new FormControl('', [Validators.required])
  responseMessages: string[] = [];
  urlParams: any;
  canChangePassword: boolean = false;
  successEmail = false;
  
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.urlParams = this.route.snapshot.queryParams;
    let now = new Date();
    if (Object.keys(this.urlParams).length != 0 && this.urlParams.expiry > JSON.stringify(now.getTime())) {
      this.canChangePassword = true;
    }
  }

  onContinue(){
    this.authService.forgetPassword(this.emailControl.value).subscribe((res: any) => {
        this.successEmail = true;
        this.responseMessages = [res.message];
      }, error => {
        this.responseMessages = error.error.errors;
      }
    )    
  }

  onChangePassword(){
    let headers = {
      headers: new HttpHeaders({
        'access-token': this.urlParams['access-token'],
      'client': this.urlParams['client'],
      'uid': this.urlParams['uid']
      }),
    }

    let params = {
      password: this.passwordControl.value,
      password_confirmation: this.confirmPasswordControl.value,
    };

    this.authService.resetPassword(headers, params).subscribe((res: any) => {
      this.responseMessages = [res.message];
    }, error => {
      this.responseMessages = Array.isArray(error.error.errors) ? error.error.errors : ['Ocurrió un error desconocido']
    })
  }
}