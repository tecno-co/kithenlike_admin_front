import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tecno-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss']
})
export class PasswordComponent implements OnInit {

  authorizedActions: any;
  tableHeaders: string[] = ['Nombre', 'Restricción', 'Estado'];
  tableData: any[] = [
    {name: "Mayúsculas", restriction: "[A-Z]", checkOption: true, idForOptions: 1},
    {name: "Minúsculas", restriction: "[a-z]", checkOption: true, idForOptions: 2},
    {name: "Longitud", restriction: "1", checkOption: true, idForOptions: 3},
    {name: "Caracteres especiales", restriction: "[=#@$!%*?&]", checkOption: true, idForOptions: 4},
    {name: "Números", restriction: "[0-9]", checkOption: true, idForOptions: 5},
    {name: "Palabras prohibidas", restriction: "[tecno, 2021, proyectos]", checkOption: true, idForOptions: 6},
    {name: "Expiración contraseña (dias)", restriction: "30", checkOption: true, idForOptions: 7},
  ];

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }

  onAdd () {
    // let dialogConfig = new MatDialogConfig;
    // dialogConfig.disableClose = false;    
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "50%";
    // let dialogRef = this.dialog.open(KeywordsFormComponent, dialogConfig);
    // dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      
    //   this.keywordsService.addKeyword({key_word: res.value}).subscribe((res:any) => {
    //     if (res.status == 'created') {
    //       this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
    //     } else {
    //       this.openSnackBar('Error al añadir', '', 1000, 'error-snack-bar');
    //     }
    //   },
    //   (error:any) => {
    //   this.openSnackBar('Error al añadir: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    //   });
    //   dialogRef.close();
    // })
  }

  onEdit(row: any) {
    // let dialogConfig = new MatDialogConfig;
    // dialogConfig.data = row;
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "50%";
    // let dialogRef = this.dialog.open(KeywordsFormComponent, dialogConfig);
    // dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
    //   this.keywordsService.updateKeyword(res.value).subscribe((res:any) => {
    //     if (res.status == 'updated') {
    //       this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
    //     } else {
    //       this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
    //     }
    //   },
    //   (error:any) => {
    //     this.openSnackBar('Error al editar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    //   });
    //   dialogRef.close();
    // })
  }
  
  onDelete(row: any) {
    // let dialogConfig = new MatDialogConfig;
    // dialogConfig.data = row;
    // dialogConfig.data.title = 'Eliminar palabra clave';
    // dialogConfig.disableClose = false;  
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "40%";
    // let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    // dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

    //   this.keywordsService.deleteKeyword(row).subscribe((res:any) => {
    //     if (res.status) {
    //       this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
    //     } else {
    //       this.openSnackBar('Error al eliminar', '', 1000, 'error-snack-bar');
    //     }
    //   },
    //   (error:any) => {
    //     this.openSnackBar('Error al eliminar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    //   });
    //   dialogRef.close();
    // })
  }

  onStatusChange(row: any) {
    // let dialogConfig = new MatDialogConfig;
    // dialogConfig.data = row;
    // dialogConfig.data.title = 'Cambiar estado';
    // dialogConfig.disableClose = false;  
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = "30%";
    // let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);

    // dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
    //   res.checkOption = !res.checkOption;
    //   this.keywordsService.updateKeywordStatus(res).subscribe((res: any) => {
        
    //     if (res.status == 'updated') {
    //       this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
    //     } else {
    //       this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
    //     }
    //   },
    //   (error:any) => {
    //     this.openSnackBar('Error al editar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    //   });
    //   dialogRef.close();
    // })
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
