import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
        this.router.navigate(['/home']);
        
      }));
  }

  signOut() {

    let httpOptions = this.reqOptions();

    return this.http.delete<ResponseData>(this.API + '/auth/sign_out', httpOptions)
      .pipe(
        finalize(() => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('client');
            localStorage.removeItem('expiry');
            localStorage.removeItem('tokenType');
            localStorage.removeItem('uid');
            this.router.navigate(['/login']);
          }
        )
      );
  }

  getAuthData(): AuthData{
    const authData: AuthData = {
      accessToken: localStorage.getItem('accessToken')!,
      client: localStorage.getItem('client')!,
      expiry: localStorage.getItem('expiry')!,
      tokenType: localStorage.getItem('tokenType')!,
      uid: localStorage.getItem('uid')!
    }
    this.authData = authData;
    return this.authData;
  }

  setAuthData(authData: AuthData) {
    localStorage.setItem('accessToken', authData.accessToken);
    localStorage.setItem('client', authData.client);
    localStorage.setItem('uid', authData.uid);
  }

  isAuthenticated() {

    let token = localStorage.getItem('accessToken');

    if (token) {
      return true;
    }
    return false;
  }

  validateToken() {

    let httpOptions = this.reqOptions();

    return this.http.get<ResponseData>(this.API + '/auth/validate_token', httpOptions)
      .pipe().subscribe(
        (res) => console.log(res),
        (error) => this.signOut());
  }
  
}
