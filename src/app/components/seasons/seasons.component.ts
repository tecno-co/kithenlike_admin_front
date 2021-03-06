import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { SeasonsFormComponent } from './seasons-form/seasons-form.component';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  tableHeaders: string[] = [];

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
      },
      (error:any) => {
        this.openSnackBar('Error al añadir: ' + error?.error?.name, '', 2000, 'error-snack-bar');
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
      },(error:any) => {
        this.openSnackBar('Error al editar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
      });
      dialogRef.close();
    })
  }
  
  onDelete(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Eliminar temporada';
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.seasonsService.deleteSeason(row).subscribe((res:any) => {
        if (res.status) {
          this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al eliminar', '', 1000, 'error-snack-bar');
        }
      },
      (error:any) => {
        this.openSnackBar('Error al eliminar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
      });
      dialogRef.close();
    })
  }

  onStatusChange(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Cambiar estado';
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "30%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);

    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      res.checkOption = !res.checkOption;
      this.seasonsService.updateSeasonStatus(res).subscribe((res: any) => {
        
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
        }
      },
      (error:any) => {
        this.openSnackBar('Error al editar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
      });
      dialogRef.close();
    })
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
