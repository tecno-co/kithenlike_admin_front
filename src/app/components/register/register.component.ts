import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
 
  @ViewChild('registerForm', { static: true })

  // registerData: RegisterData = <RegisterData>{};

  public roles: String[] = ["Rol 1", "Rol 2", "Rol 3"]

  constructor() {}

  ngOnInit(): void {
  }

  register(){
    /*
    this.tokenService.registerAccount({
      login:                'example@example.org',
      password:             'secretPassword',
      passwordConfirmation: 'secretPassword'
    }).subscribe(
      res =>      console.log(res),
      error =>    console.log(error)
  );*/
  } 
}
