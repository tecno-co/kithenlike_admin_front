import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  private readonly API = `${environment.API}`;
  
  emitDataTable = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSeasons() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/seasons/list` , httpOptions)
    .pipe();
  }

  addSeason(season: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/seasons`, season, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateSeason(season: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/seasons/${season.idForOptions}`, season, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateSeasonStatus(season: any) {
    season.is_active = season.checkOption;
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/seasons/${season.idForOptions}`, season, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }


  deleteSeason(season: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/seasons/${season.idForOptions}/logical_delete`, season, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
