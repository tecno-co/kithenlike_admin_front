import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'tecno-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  currentPasswordControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=#@$!%*?&]).{1,}')
  ])
  confirmPasswordControl = new FormControl('', [Validators.required]);
  responseMessages: string[] = [];

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
  }

  onChangePassword(){

    let params = {
      current_password: this.currentPasswordControl.value,
      password: this.passwordControl.value,
      password_confirmation: this.confirmPasswordControl.value,
    };
    
    this.authService.changePassword(params).subscribe((res: any) => {
      console.log('Bien');
      console.log(res);
    }, error => {
      console.log(error);
    })
  }

}
