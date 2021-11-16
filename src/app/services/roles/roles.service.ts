import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  emitDataTable = new EventEmitter<any>();

  private readonly API = `${environment.API}`;
  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getRoles() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/roles/list` , httpOptions)
    .pipe();
  }

  addRole(role: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/roles`, role, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
