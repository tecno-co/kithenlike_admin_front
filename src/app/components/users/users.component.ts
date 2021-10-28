import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { UsersFormComponent } from './users-form/users-form.component';

@Component({
  selector: 'tecno-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  tableHeaders: string[] = ['Nombre', 'Apellido', 'Correo', 'Perfil', 'Estado'];

  tableData: any[] = [
    {name: 'Kevin', last_name: 'Garzón', email: 'kevin.garzon@tecno.co', profile: 'Administrador', is_active: true, idForOptions: 1},
    {name: 'Kevin', last_name: 'Garzón', email: 'kevin.garzon@tecno.co', profile: 'Administrador', is_active: true, idForOptions: 1},
    {name: 'Kevin', last_name: 'Garzón', email: 'kevin.garzon@tecno.co', profile: 'Administrador', is_active: true, idForOptions: 1},
    {name: 'Kevin', last_name: 'Garzón', email: 'kevin.garzon@tecno.co', profile: 'Administrador', is_active: true, idForOptions: 1},
  ];

  constructor(
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    dialogConfig.data = {};
    dialogConfig.data.mode = 'create';
    let dialogRef = this.dialog.open(UsersFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.tableData.push(res);
      console.log(res);
      dialogRef.close();
    })
  }

  onEdit(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(UsersFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      
      console.log(res);
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

      console.log(res);
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
      
      console.log(res);
      dialogRef.close();
    })
  }

}
