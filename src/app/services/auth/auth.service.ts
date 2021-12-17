import { C } from '@angular/cdk/keycodes';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, share, tap } from 'rxjs/operators';
import { AuthData, LoginData, ResponseData } from 'src/app/models/auth/auth';
import { environment } from 'src/environments/environment';
import { MenuService } from '../menu/menu.service';
import { PermissionsService } from '../permissions/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private expirationTime: number = 600000; // milisegundos

  private authData!: AuthData;

  private pageId = 2;

  private isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly API = environment.API;

  constructor(
    private router: Router,
    private http: HttpClient,
    private menuService: MenuService
  ) {}


  reqOptions(){
    let currentData = this.getAuthData();
    
    // if (!this.hasExpired()) {
    //   this.setExpiration();
    // }

    return {
      headers: new HttpHeaders({
        'access-token': currentData.accessToken,
        'client': currentData.client,
        'uid': currentData.uid
      }),
      params: new HttpParams().append('page_id', this.pageId + '')
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
        localStorage.setItem('user', JSON.stringify(res.body.data));
        // this.setExpiration();
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
        
    return this.http.delete<ResponseData>(this.API + '/auth/sign_out', httpOptions)
      .pipe(
        tap(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('client');
          localStorage.removeItem('uid');
          localStorage.removeItem('expiration');
          localStorage.removeItem('authorizedPageActions');
          localStorage.removeItem('user');
          this.isAuth.next(false);
          this.router.navigate(['/login']);
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
    let now = new Date();
    let expiryTime = localStorage.getItem('ng2Idle.main.expiry');
    let currentTime = JSON.stringify(now.getTime())

    
    if (expiryTime && currentTime < expiryTime && this.isAuth.getValue() != true) {
      if (localStorage.getItem('accessToken') == null) {
        this.isAuth.next(false);
      } else {
        this.isAuth.next(true);
      }
    }
    return this.isAuth.asObservable();
  }

  forgetPassword(email: string){
    return this.http.post<any>(this.API + '/auth/password', {"email": email})
  }

  resetPassword(headers: any, params: any){
    return this.http.put<any>(this.API + '/auth/password', params, headers)
  }

  changePassword(params: any) {
    let httpOptions = this.reqOptions();
    console.log(params)
    return this.http.put<any>(this.API + '/auth', params, httpOptions)
  }

  setPageId(id: number){
    this.pageId = id;
  }
}
