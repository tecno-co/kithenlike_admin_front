import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';

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

  inputParams: any = {
    uid: 'kevin.garzon@tecno.co',
    access_token: 'fLAdOyHf9558i1pgvNcXAg',
    client: 'iSKdnYeoagKy6Wl8w_CaiA'
  };

  private readonly API = `${environment.API}`;
  
  emitDataTable = new EventEmitter<any>();
  
  constructor(
    private http: HttpClient
  ) { 
    this.httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bareer W_GpjxZN_MRaCX_FYfZX`
      }),
      params: this.inputParams
    }
   }


  getThemes() {
    return this.http.get<TableData[]>(`${this.API}/themes`).pipe(
      tap(console.log)
    )
    // return this.tableData;
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
