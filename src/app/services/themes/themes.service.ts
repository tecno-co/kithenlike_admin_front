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
  tableData: any[] = [
    { id: '1', code: '1', name: "Navidad", status: true, options: ""},
    { id: '2', code: '2', name: "Dia de los niños", status: true, options: ""},
    { id: '3', code: '3', name: "Dia de la madre", status: true, options: ""},
    { id: '4', code: '4', name: "Dia del padre", status: true, options: ""},
    { id: '5', code: '5', name: "Amor y amistad", status: true, options: ""},  
  ];

  httpOptions!: any;

  private readonly API = `${environment.API}`;
  
  emitDataTable = new EventEmitter<any>();
  
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}


  getThemes() {

    let currentData = this.authService.getAuthData();
    let httpOptions = {
      headers: new HttpHeaders({
        'Accept': 'application/vnd.finapp.v1',
        'access-token': currentData.accessToken,
        'client': currentData.client,
        'uid': currentData.uid
      })
    }

    return this.http.get<TableData>(this.API + '/themes', httpOptions)
    .pipe(tap((data: any) => this.emitDataTable.emit(data)));
  }

  addTheme(season: any) {
    this.tableData.push(season);
    this.emitDataTable.emit(this.tableData);
  }

  updateTheme(season: any) {
    this.tableData.splice(season.data.id-1, 1, season.data);
    this.emitDataTable.emit(this.tableData);
  }

  deleteTheme(id: number) {
    for (let i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i].id == id) {
        this.tableData.splice(i,1);
      }
    }
  }
}
