import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { UsersFormComponent } from './users-form/users-form.component';

@Component({
  selector: 'tecno-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  tableHeaders: string[] = [];
  tableData: any[] = [];
  roles = []

  constructor(
    public dialog: MatDialog,
    private usersService: UsersService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      this.tableData = res.usersResolver.dataTable;
      this.tableHeaders = res.usersResolver.headers;
      this.roles = res.rolesListResolver.dataTable;
    })

    this.usersService.emitDataTable
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
    dialogConfig.data = {};
    dialogConfig.data.allRoles = this.roles;
    dialogConfig.data.mode = 'create';
    let dialogRef = this.dialog.open(UsersFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.usersService.addUser(res).subscribe((res:any) => {
        if (res) {
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
    dialogConfig.data.mode = 'edit';
    let dialogRef = this.dialog.open(UsersFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.usersService.updateUser(res).subscribe((res: any) => {
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 2000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 2000, 'error-snack-bar');
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
    dialogConfig.data.title = 'Eliminar usuario';
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.usersService.deleteUser(row).subscribe((res:any) => {
        if (res.status) {
          this.openSnackBar('Eliminado con éxito', '', 2000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al eliminar', '', 2000, 'error-snack-bar');
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
    dialogConfig.width = "40%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      res.checkOption = !res.checkOption;
      this.usersService.updateUserStatus(res).subscribe((res: any) => {
        
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 2000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 2000, 'error-snack-bar');
        }
      },
      (error: any ) => {
        this.openSnackBar('Error al editar', '', 2000, 'error-snack-bar');
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
