import { Injectable } from '@angular/core';
import {Subject, Observable} from "rxjs";
import { AngularTokenService, RegisterData, SignInData } from 'angular-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSignedIn$:Subject<boolean> = new Subject();

  constructor(public authService:AngularTokenService) {

    this.authService.validateToken().subscribe(
        res => res.status == 200 ? this.userSignedIn$.next(res.json().success) : this.userSignedIn$.next(false)
    )
  }
  /*
  logOutUser():Observable<Response>{

    return this.authService.signOut().map(
        res => {
          this.userSignedIn$.next(false);
          return res;
        }
    );
  }

  registerUser(signUpData:  RegisterData):Observable<Response>{
    return this.authService.registerAccount(signUpData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );
  }

  logInUser(signInData: SignInData):Observable<Response>{

    return this.authService.signIn(signInData).map(
        res => {
          this.userSignedIn$.next(true);
          return res
        }
    );

  }*/
}
