import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class DesignsService {
  
  tableData: any[] = [
    { code: '1', name: "Nombre", img: 'assets/images/img1.png', description: 'Descripción', keywords: ['oscuro', 'juvenil'], seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: false, idForOptions: '1'},
    { code: '2', name: "Nombre", img: 'assets/images/img2.png', description: 'Descripción', keywords: ['colorido', 'claro'], seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: true, idForOptions: '2'},
    { code: '3', name: "Nombre", img: 'assets/images/img3.png', description: 'Descripción', keywords: ['dorado'],            seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: true, idForOptions: '3'},
    { code: '4', name: "Nombre", img: 'assets/images/img1.png', description: 'Descripción', keywords: ['oscuro', 'juvenil'], seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: true, idForOptions: '4'},
    { code: '5', name: "Nombre", img: 'assets/images/img2.png', description: 'Descripción', keywords: ['colorido', 'claro'], seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: true, idForOptions: '5'},
    { code: '6', name: "Nombre", img: 'assets/images/img3.png', description: 'Descripción', keywords: ['plantas'],           seasons: ['navidad', 'dia de los niños', 'dia da la madre'], status: false, idForOptions: '6'},        
  ];

  //  private readonly API = `${environment.API}`;

  emitDataTable = new EventEmitter<any>();

  httpOptions!: any;

  constructor( ) {}

  getDesigns() {
    return this.tableData;
  }

  addDesign(design: any) {
    this.tableData.push(design);
    this.emitDataTable.emit(this.tableData);
  }

  updateDesign(design: any) {
    this.tableData.splice(design.data.id-1, 1, design.data);
    this.emitDataTable.emit(this.tableData);
  }

  deleteDesign(id: number) {
    for (let i = 0; i < this.tableData.length; i++) {
      if(this.tableData[i].id == id) {
        this.tableData.splice(i,1);
      }
    }
  }
}
