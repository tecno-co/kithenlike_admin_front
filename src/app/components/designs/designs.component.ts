import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DesignsService } from 'src/app/services/designs/designs.service';
import { DynamicTableComponent } from '../shared/dynamic-table/dynamic-table.component';
import { DesignsFormComponent } from './designs-form/designs-form.component'; 

@Component({
  selector: 'app-master-base',
  templateUrl: './designs.component.html',
  styleUrls: ['./designs.component.scss']
})

export class DesignsComponent implements OnInit {

  @Output() image: EventEmitter<boolean> = new EventEmitter();

  tableHeaders: string[] = [ 'No.', 'CÓDIGO', 'NOMBRE', 'IMAGEN', 'DESCRIPCIÓN', 'PALABRAS CLAVE', 'TEMPORADAS', 'ESTADO'];
  path: String = "";

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private designsService: DesignsService,
  ) {}

  ngOnInit(): void {
    this.tableData = this.designsService.getDesigns();
    this.designsService.emitDataTable.subscribe((data: any) => {
      this.tableData = this.designsService.getDesigns().slice();
    })
  }

  setImage(e: String) {
      this.path = e;
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(DesignsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      result.data.id = this.designsService.tableData.length + 1;
      result.data.code = this.designsService.tableData.length + 1;
      this.designsService.addDesign(result.data);
      dialogRef.close();
    }) 
  }

  onEdit(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(DesignsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      this.designsService.updateDesign(result);
      dialogRef.close();
    })
  }
  
  onDelete(id: number) {
    this.designsService.deleteDesign(id);
    this.tableData = this.designsService.getDesigns().slice();
  }

}
