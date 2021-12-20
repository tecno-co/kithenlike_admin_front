import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  emitDataTable = new EventEmitter<any>();

  private readonly API = `${environment.API}`;
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getUsers() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/people/list`, httpOptions)
    .pipe();
  }

  addUser(user: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/people`, user, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateUser(user: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/people/${user.get('idForOptions')}`, user, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateUserStatus(user: any) {
    let httpOptions = this.authService.reqOptions();
    user.is_active = user.checkOption;
    return this.http.put<any>(`${this.API}/people/${user.idForOptions}`, user, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  deleteUser(user: any) {
    console.log(user)
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/people/${user.idForOptions}/logical_delete`, user, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
