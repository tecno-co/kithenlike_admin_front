import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main/main.service';
import { PagesService } from 'src/app/services/pages/pages.service';

@Component({
  selector: 'tecno-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit {

  menuModules: any[] = [];
  menuPages: any[] = [];
  
  menuPage: any;
  menuModule: any;

  addPage = false;
  addModule = false;
  

  constructor(
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private mainService: MainService,
    private fb: FormBuilder,
    private pagesService: PagesService
  ) {}

  ngOnInit(): void {
    this.route.data.subscribe((res:any) => {
      res.menuResolver.forEach((module: any) => this.menuModules.push(module.module));
      // res.allMenuPagesResolver.forEach((module: any) => module.pages.forEach((page: any) => this.menuPages.push(page)));
      this.menuPages = res.allMenuPagesResolver
      .map((page: any) => ({
        id: page.id,
        name: page.name,
        description: page.description,
        iconId: page.icon.id,
        icon: page.icon.name,
        moduleId: page.menu_module.id,
        moduleName: page.menu_module.name,
        route: page.route,
        ordering: page.ordering
      }));

      setTimeout(() => {this.mainService.hideLoading()}, 0);
    })


    // this.menuService.emitDataTable
    //   .subscribe((res: any) => {
    //     this.tableData = res.data.dataTable;
    //     this.tableHeaders = res.data.headers;
    // })

  }

  onAddPage(row: any) {
    this.pagesService.addPage({page: row.value}).subscribe((res:any) => {
      this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
    },
    (error:any) => {
      this.openSnackBar('Error al añadir: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    });
  }

  onEditPage(row: any) {
    this.pagesService.updatePage({page: row.value}).subscribe((res:any) => {
      this.openSnackBar('Actualizado con Éxito', '', 1000, 'success-snack-bar');
    },
    (error:any) => {
      this.openSnackBar('Error al actualizar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    });
  }
  
  onDeletePage(row: any) {
    // this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
  }

  onAddModule(row: any) {
    this.pagesService.addModule({menu_module: row.value}).subscribe((res:any) => {
      this.openSnackBar('Añadido con Éxito', '', 1000, 'success-snack-bar');
    },
    (error:any) => {
      this.openSnackBar('Error al añadir: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    });
  }

  onEditModule(row: any) {
    this.pagesService.updateModule({menu_module: row.value}).subscribe((res:any) => {
      this.openSnackBar('Actualizado con Éxito', '', 1000, 'success-snack-bar');
    },
    (error:any) => {
      this.openSnackBar('Error al actualizar: ' + error?.error?.name, '', 2000, 'error-snack-bar');
    });
  }
  
  onDeleteModule(row: any) {
    // this.openSnackBar('Eliminado con éxito', '', 1000, 'success-snack-bar');
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

  setModule(module: any) {
    this.menuModule = module;    
  }

  setPage(page: any) {
    this.menuPage = page;
  }

}
