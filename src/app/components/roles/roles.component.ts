import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main/main.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';
import { RolesService } from 'src/app/services/roles/roles.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { RolesFormComponent } from './roles-form/roles-form.component';

@Component({
  selector: 'tecno-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  tableHeaders: string[] = [ 'No.', 'CÓDIGO', 'NOMBRE', 'ESTADO'];
  tableData: any[] = [];
  authorizedActions: any;

  constructor(
    public dialog: MatDialog,
    private rolesService: RolesService,
    private permissionsService: PermissionsService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.authorizedActions = JSON.parse(localStorage.getItem('authorizedPageActions')!);
    this.route.data.subscribe((res:any) => {
      this.tableData = res.rolesResolver.dataTable;
      this.tableHeaders = res.rolesResolver.headers;
      setTimeout(() => {this.mainService.hideLoading()}, 0);
    })

    this.rolesService.emitDataTable
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
    let dialogRef = this.dialog.open(RolesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      
      this.rolesService.addRole({key_word: res.value}).subscribe((res:any) => {
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
    this.openSnackBar('Editar role ' + row.name+ ' en construcción', '', 2000, 'error-snack-bar');
  }

  onDelete(row: any) {
    this.openSnackBar('Eliminar role ' + row.name+ ' en construcción', '', 2000, 'error-snack-bar');
  }

  onShowPermissions(role: any){
    this.router.navigate(['/permissions'], {queryParams: { role_id: role.idForOptions}});
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
