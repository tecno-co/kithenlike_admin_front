import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from 'src/app/services/categories/categories.service';
import { MainService } from 'src/app/services/main/main.service';
import { AlertDialogComponent } from '../shared/alert-dialog/alert-dialog.component';
import { CategoriesFormComponent } from './categories-form/categories-form.component';

@Component({
  selector: 'tecno-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  tableHeaders: string[] = [];
  tableData: any[] = [];
  authorizedActions: any;

  constructor(
    public dialog: MatDialog,
    private categoriesService: CategoriesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private mainService: MainService
  ) { }

  ngOnInit(): void {
    this.authorizedActions = JSON.parse(localStorage.getItem('authorizedPageActions')!);
    this.route.data.subscribe((res:any) => {
      this.tableData = res.categoriesResolver.dataTable;
      this.tableHeaders = res.categoriesResolver.headers;
      setTimeout(() => {this.mainService.hideLoading()}, 0);
    })

    this.categoriesService.emitDataTable
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
    let dialogRef = this.dialog.open(CategoriesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.categoriesService.addCategory({'category': res.value}).subscribe((res:any) => {
        if (res.status == 'created') {
          this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al añadir', '', 1000, 'error-snack-bar');
        }
      },
      (error:any) => {
        let message = error?.error?.name == 'translation missing: es.activerecord.errors.models.category.attributes.name.taken' ? 'El nombre ya existe' : error?.error?.name;
        this.openSnackBar('Error al añadir: ' + message, '', 2000, 'error-snack-bar');
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
    let dialogRef = this.dialog.open(CategoriesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {
      this.categoriesService.updateCategory(res.value).subscribe((res:any) => {
        if (res.status == 'updated') {
          this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
        } else {
          this.openSnackBar('Error al editar', '', 1000, 'error-snack-bar');
        }
      },(error:any) => {
        let message = error?.error?.name == 'translation missing: es.activerecord.errors.models.category.attributes.name.taken' ? 'El nombre ya existe' : error?.error?.name;
        this.openSnackBar('Error al editar: ' + message, '', 2000, 'error-snack-bar');
      });
      dialogRef.close();
    })
  }
  
  onDelete(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Eliminar Categoría';
    dialogConfig.disableClose = false;  
    dialogConfig.autoFocus = true;
    dialogConfig.width = "40%";
    let dialogRef = this.dialog.open(AlertDialogComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((res: any ) => {

      this.categoriesService.deleteCategory(row).subscribe((res:any) => {
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
      this.categoriesService.updateCategoryStatus(res).subscribe((res: any) => {
        
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
