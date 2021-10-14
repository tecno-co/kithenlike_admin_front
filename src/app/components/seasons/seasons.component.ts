import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';
import { SeasonsFormComponent } from './seasons-form/seasons-form.component';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  tableHeaders: string[] = ['CÓDIGO', 'NOMBRE', 'ESTADO'];

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private seasonsService: SeasonsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      this.tableData = res.seasonsResolver.dataTable;
      this.tableHeaders = res.seasonsResolver.headers;
    })

    this.seasonsService.emitDataTable
      .subscribe((res: any) => {
        this.tableData = res.data.dataTable;
        this.tableHeaders = res.data.headers;
    })
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(SeasonsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.seasonsService.addSeason({'season': res.value}).subscribe((res:any) => {
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
    let dialogRef = this.dialog.open(SeasonsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.seasonsService.updateSeason(res.value).subscribe((res:any) => {
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
        }
      });
      dialogRef.close();
    })
  }
  
  onDelete(row: any) {
    this.seasonsService.deleteSeason(row).subscribe((res:any) => {
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
