import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeasonsService {

  tableData: any[] = [
    { id: '1', code: '1', name: "Navidad", status: true, options: ""},
    { id: '2', code: '2', name: "Dia de los niños", status: true, options: ""},
    { id: '3', code: '3', name: "Dia de la madre", status: true, options: ""},
    { id: '4', code: '4', name: "Dia del padre", status: true, options: ""},
    { id: '5', code: '5', name: "Amor y amistad", status: true, options: ""},  
  ];

  emitDataTable = new EventEmitter<any>();

  constructor() { }

  getSeasons() {
    return this.tableData;
  }

  addSeason(season: any) {
    this.tableData.push(season);
    this.emitDataTable.emit(this.tableData);
  }

  updateSeason(season: any) {
    this.tableData.splice(season.data.id-1, 1, season.data);
    this.emitDataTable.emit(this.tableData);
  }

  deleteSeason(id: number) {
    for (let i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i].id == id) {
        this.tableData.splice(i,1);
      }
    }
  }
}
