import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ThemesService {

  private readonly API = `${environment.API}`;
  
  emitDataTable = new EventEmitter<TableData>();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getThemes() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/themes/list` , httpOptions)
    .pipe();
  }

  addTheme(theme: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/themes`, theme, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateTheme(theme: any) {
    let httpOptions = this.authService.reqOptions();
    console.log(theme);
    return this.http.put<any>(`${this.API}/themes/${theme.idForOptions}`, theme, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  deleteTheme(theme: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/themes/${theme.idForOptions}/logical_delete`, theme, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
