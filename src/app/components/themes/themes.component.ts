import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { ThemesFormComponent } from './themes-form/themes-form.component';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  tableHeaders: string[] = [];

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private themeService: ThemesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      this.tableData = res.themesResolver.dataTable;
      this.tableHeaders = res.themesResolver.headers;
    })

    this.themeService.emitDataTable
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
    let dialogRef = this.dialog.open(ThemesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.themeService.addTheme({theme: res.value}).subscribe((res:any) => {
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
    let dialogRef = this.dialog.open(ThemesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      
      row.name = res.value.name;
      row.theme_class = res.value.theme_class;
      this.themeService.updateTheme(row).subscribe((res:any) => {

        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al aditar', '', 1000, 'error-snack-bar');
        }
      });
      dialogRef.close();
    })
  }
  
  onDelete(row: any) {
    this.themeService.deleteTheme(row).subscribe((res:any) => {
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
