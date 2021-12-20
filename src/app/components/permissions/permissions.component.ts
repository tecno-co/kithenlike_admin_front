import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main/main.service';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';

@Component({
  selector: 'tecno-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  
  loadingTab = true;
  roleId = 0;
  selectedTab = 0;
  menuModules: any = [];
  tableData = [];
  tableHeaders = ['No.', 'Página', 'Acciones'];
  authorizedActions: any;

  actions = [
        {
          authorized: true,
          name_action_header: "Listar Todos"
        },
        {
          authorized: false,
          name_action_header: "Listar activos"
        },
        {
          authorized: true,
          name_action_header: "Eliminacion Logica"
        },
      ] 
  
  constructor(
    private permissionsService: PermissionsService,
    private _snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private mainService: MainService
  ) {
   }

  ngOnInit(): void {
    this.authorizedActions = JSON.parse(localStorage.getItem('authorizedPageActions')!);
    this.roleId = Number(this.route.snapshot.queryParamMap.get('role_id')) || 0;

    this.route.data.subscribe((result: any) => {
      this.menuModules = result.pagePermissionsResolver.role.module.map((module: any, index: number) => ({index: index, name: module.name}));
      this.tableData = result.pagePermissionsResolver.role.module[this.selectedTab].pages.map((page: any) => ({page_id: page.id, name: page.name, actions: page.actions}))
      this.loadingTab = false;
      setTimeout(() => {this.mainService.hideLoading()}, 0);
    })
    
  }

  onAdd() {
    this.openSnackBar('añadir en construcción', '', 2000, 'error-snack-bar');
  }

  onEdit(row: any) {
    this.openSnackBar('Editar en construcción', '', 2000, 'error-snack-bar');
  }

  onDelete(row: any) {
    this.openSnackBar('Eliminar en construcción', '', 2000, 'error-snack-bar');
  }

  onChangeActionStatus(row: any) {
    let rolePageAction = {
      role_id: this.roleId,
      page_id: row.item.page_id,
      action: row.action.action,
      authorized: !row.action.authorized
    }

    this.permissionsService.changeRolePageAction(rolePageAction).subscribe((res: any) => {
      this.refresh();
      this.openSnackBar('Se cambío el estado correctamente', '', 2000, 'success-snack-bar');
    },
    (error: any ) => {
      this.openSnackBar('Error al cambiar estado', '', 2000, 'error-snack-bar');
  })
  }

  onChangeAllActionStatus(row: any) {
    let rolePageActions = {
      role_id: this.roleId,
      page_id: row.page_id,
      authorized: !row.authorizedAll
    }

    this.permissionsService.changeRolePageAllActions(rolePageActions).subscribe((res: any) => {
        this.refresh();
        this.openSnackBar('Se cambío el estado correctamente', '', 2000, 'success-snack-bar');
      },
      (error: any ) => {
        this.openSnackBar('Error al cambiar estado', '', 2000, 'error-snack-bar');
    })
  }

  refresh() {
    this.permissionsService.emitDataTable.subscribe(
        this.permissionsService.getRolePageAllActions().subscribe(async (result: any) => {
          this.tableData = await result.role.module[this.selectedTab].pages.map((page: any) => ({page_id: page.id, name: page.name, actions: page.actions}))
          this.loadingTab = false;
        }
      )
    )
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

  onChangeTab(tab: any) {
    this.selectedTab = tab;
    this.loadingTab = true;
    this.refresh()
  }
}
