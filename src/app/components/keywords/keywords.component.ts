import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { KeywordsFormComponent } from './keywords-form/keywords-form.component';

@Component({
  selector: 'app-keywords',
  templateUrl: './keywords.component.html',
  styleUrls: ['./keywords.component.scss']
})
export class KeywordsComponent implements OnInit {

  tableHeaders: string[] = [ 'No.', 'CÓDIGO', 'NOMBRE', 'ESTADO'];

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private keywordsService: KeywordsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      this.tableData = res.keywordsResolver.dataTable;
      this.tableHeaders = res.keywordsResolver.headers;
    })

    this.keywordsService.emitDataTable
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
    let dialogRef = this.dialog.open(KeywordsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      
      this.keywordsService.addKeyword({key_word: res.value}).subscribe((res:any) => {
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
    let dialogRef = this.dialog.open(KeywordsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.keywordsService.updateKeyword(res.value).subscribe((res:any) => {
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
  
  onDelete(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Eliminar palabra clave';
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.keywordsService.deleteKeyword(row).subscribe((res:any) => {
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
      this.keywordsService.updateKeywordStatus(res).subscribe((res: any) => {
        
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
