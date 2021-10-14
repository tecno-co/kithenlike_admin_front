import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
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

  tableHeaders: string[] = [];
  path: string = "";

  tableData: any[] = [];

  allSeasons: any[] = [];
  allKeywords: string[] = [];

  constructor(
    public dialog: MatDialog,
    private designsService: DesignsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      this.tableData = res.designsResolver.dataTable;
      this.tableHeaders = res.designsResolver.headers;
      res.keywordsListResolver.dataTable.map((data: any) => this.allKeywords.push(data.name));
      res.seasonsListResolver.dataTable.map((data: any) => this.allSeasons.push({name: data.name, id: data.idForOptions}));
    })

    this.designsService.emitDataTable
      .subscribe((res: any) => {
        this.tableData = res.data.dataTable;
        this.tableHeaders = res.data.headers;
    })

  }

  setImage(e: string) {
      this.path = e;
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {};
    dialogConfig.data.keywordsList = this.allKeywords;
    dialogConfig.data.seasonsList = this.allSeasons;
    dialogConfig.data.mode = 'create';
    let dialogRef = this.dialog.open(DesignsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.designsService.addDesign(res.value).subscribe((res:any) => {
        if (res.status == 'created') {
          this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al añadir', '', 1000, 'error-snack-bar');
        }
      });
      dialogRef.close();
    }) 
  }
  
  onEdit(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data.keywordsList = this.allKeywords;
    dialogConfig.data.seasonsList = this.allSeasons;
    dialogConfig.data.mode = 'edit';
    let dialogRef = this.dialog.open(DesignsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.designsService.updateDesign(res.value).subscribe((res: any) => {
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
        }
      },
      (error: any ) => {
        this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
      });
      dialogRef.close();
    })
  }
  
  onDelete(row: any) {
    this.designsService.deleteDesign(row).subscribe((res:any) => {
      if (res.status) {
        this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
      } else {
        this.openSnackBar('Error al eliminar', '', 1000, 'error-snack-bar');
      }
    });
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
