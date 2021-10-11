import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class KeywordsService {

  emitDataTable = new EventEmitter<any>();

  private readonly API = `${environment.API}`;
  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getKeywords() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/key_words/list` , httpOptions)
    .pipe();
  }

  getKeywordList() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/key_words/list` , httpOptions)
    .pipe();
  }

  addKeyword(keyword: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/key_words`, keyword, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateKeyword(keyword: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/key_words/${keyword.idForOptions}`, keyword, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  deleteKeyword(keyword: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/key_words/${keyword.idForOptions}/logical_delete`, keyword, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
