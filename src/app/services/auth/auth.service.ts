import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { AuthData, LoginData, ResponseData } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authData!: AuthData;
  
  private isAuth?: boolean = false;

  private readonly API = environment.API;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}


  reqOptions(){
    let currentData = this.getAuthData();

    return {
      headers: new HttpHeaders({
        'access-token': currentData.accessToken,
        'client': currentData.client,
        'uid': currentData.uid
      })
    }
  }
  
  signIn(loginData: LoginData): Observable<ResponseData> {

    return this.http.post<ResponseData>(this.API + '/auth/sign_in', loginData, {observe: 'response'})
      .pipe(tap((res: any) => {
        
        let resAuthData: AuthData = {
          accessToken: res.headers.get('access-token'),
          client: res.headers.get('client'),
          uid: res.headers.get('uid')
        }

        this.setAuthData(resAuthData);
        this.isAuth = true;
        this.router.navigate(['/home']);
        
      }));
  }

  signOut() {

    let httpOptions = this.reqOptions();

    return this.http.delete<ResponseData>(this.API + '/auth/sign_out', httpOptions)
      .pipe(
        finalize(() => {
            sessionStorage.removeItem('accessToken');
            sessionStorage.removeItem('client');
            sessionStorage.removeItem('expiry');
            sessionStorage.removeItem('tokenType');
            sessionStorage.removeItem('uid');
            this.isAuth = false;
            this.router.navigate(['/login']);
          }
        )
      );
  }

  getAuthData(): AuthData{
    const authData: AuthData = {
      accessToken: sessionStorage.getItem('accessToken')!,
      client: sessionStorage.getItem('client')!,
      expiry: sessionStorage.getItem('expiry')!,
      tokenType: sessionStorage.getItem('tokenType')!,
      uid: sessionStorage.getItem('uid')!
    }
    this.authData = authData;
    return this.authData;
  }

  setAuthData(authData: AuthData) {
    sessionStorage.setItem('accessToken', authData.accessToken);
    sessionStorage.setItem('client', authData.client);
    sessionStorage.setItem('uid', authData.uid);
  }

   isAuthenticated() {
    // this.validateToken();
    let token = sessionStorage.getItem('accessToken')

    if (token) {
      return true;
    } else {
      return false;
    }
  }

  validateToken() {

    let httpOptions = this.reqOptions();

    return this.http.get<ResponseData>(this.API + '/auth/validate_token', httpOptions)
      .pipe(share()).subscribe(
        (res) => {
          this.isAuth = true
        },
        (error) => {
          this.isAuth = false,
          this.signOut()
        });
  }
  
}
