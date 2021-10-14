import { C } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { AuthData, LoginData, ResponseData } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private expirationTime: number = 600000; // milisegundos

  private authData!: AuthData;

  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly API = environment.API;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {}


  reqOptions(){
    let currentData = this.getAuthData();

    if (!this.hasExpired()) {
      this.setExpiration();
      console.log('Can extend session');
    }

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
        this.isAuth.next(true);
        this.router.navigate(['/home']);
        this.setExpiration();
      }));
  }

  signOut() {

    let currentData = this.getAuthData();
    let httpOptions = {
      headers: new HttpHeaders({
        'access-token': currentData.accessToken,
        'client': currentData.client,
        'uid': currentData.uid
      })
    }
    this.router.navigate(['/login']);
    
    return this.http.delete<ResponseData>(this.API + '/auth/sign_out', httpOptions)
      .pipe(
        finalize(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('client');
          localStorage.removeItem('uid');
          localStorage.removeItem('expiration');
          this.isAuth.next(false);
          }
        )
      );
  }

  getAuthData(): AuthData{
    const authData: AuthData = {
      accessToken: localStorage.getItem('accessToken')!,
      client: localStorage.getItem('client')!,
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

    if (!this.hasExpired()) {
      this.setExpiration();
      this.isAuth.next(true);
    } else {
      this.signOut();
      this.isAuth.next(false);
    }

    return this.isAuth.asObservable();
  }

  validateToken() {

    let httpOptions = this.reqOptions();

    return this.http.get<ResponseData>(this.API + '/auth/validate_token', httpOptions)
      .pipe(share()).subscribe(
        (res) => {
          this.isAuth.next(true);
        },
        (error) => {
          this.isAuth.next(false);
          this.signOut()
        });
  }

  setExpiration(time = this.expirationTime) {
    let now = new Date()
    localStorage.setItem('expiration', JSON.stringify(now.getTime() + time));
  }

  hasExpired() {
    const expirationStr = localStorage.getItem('expiration');

    if (!expirationStr) {
      return true;
    }

    const expiration = JSON.parse(expirationStr);
		const now = new Date();

    if (now.getTime() > expiration) {
      this.signOut();
      return true;
    }
    
    return false;
  }
}
