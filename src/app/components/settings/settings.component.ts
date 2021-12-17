import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  authorizedActions: any;

  currentPasswordControl = new FormControl('', [Validators.required]);
  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[=#@$!%*?&]).{1,}')
  ])
  confirmPasswordControl = new FormControl('', [Validators.required]);
  responseMessages: string[] = [];
  
  constructor(
    private mainService: MainService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.authorizedActions = JSON.parse(localStorage.getItem('authorizedPageActions')!);
    setTimeout(() => {this.mainService.hideLoading()}, 0);
  }

  apply(menu: string){
    console.log('Seleccíonó el Menú ' + menu);
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
