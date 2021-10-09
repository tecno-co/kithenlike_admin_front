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

  tableData: any[] = [
    { id: '1', code: '1', name: "oscuro", status: true},
    { id: '2', code: '2', name: "juvenil", status: true},
    { id: '3', code: '3', name: "colorido", status: true},
    { id: '4', code: '4', name: "claro", status: true},
    { id: '5', code: '5', name: "dorado", status: true},  
  ];

  emitDataTable = new EventEmitter<any>();

  private readonly API = `${environment.API}`;
  

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getKeywords() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/keywords/list` , httpOptions)
    .pipe(
      tap(console.log)
    );
  }

  addKeyword(keyword: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/keywords`, keyword, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateKeyword(keyword: any) {
    this.tableData.splice(keyword.data.id-1, 1, keyword.data);
    this.emitDataTable.emit(this.tableData);
  }

  deleteKeyword(id: number) {
    for (let i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i].id == id) {
        this.tableData.splice(i,1);
      }
    }
  }
}
