import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tecno-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) { }

  menuModules: any[] = [];
  menuPages: any[] = [];

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      res.menuResolver.forEach((module: any) => this.menuModules.push(module.module));
      res.menuResolver.forEach((module: any) => module.pages.forEach((page: any) => this.menuPages.push(page)));
    })

    // this.menuService.emitDataTable
    //   .subscribe((res: any) => {
    //     this.tableData = res.data.dataTable;
    //     this.tableHeaders = res.data.headers;
    // })
  }

  onAdd () {
    this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
  }

  onEdit(row: any) {
    this.openSnackBar('Editado con éxito', '', 1000, 'success-snack-bar');
  }
  
  onDelete(row: any) {
    this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
