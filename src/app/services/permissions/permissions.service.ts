import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { Menu } from 'src/app/models/menu/menu';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {
  
  private roleId = 0;
  private readonly API = `${environment.API}`;
  emitDataTable = new EventEmitter<any>();
  emitPageAuthorized = new EventEmitter<any>();
  private _menu: Menu[] = [];
  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private route: ActivatedRoute,
  ) {}

  setRoleId(id: number) {
    this.roleId = id;
  }

  getMenuModules() {
    return this.http.get<Menu[]>(`${this.API}/menus/1/modules_pages`).pipe();
  }

  getRolePageAllActions() {
    return this.http.get<any[]>(`${this.API}/pages/${this.roleId}/authorized_page_actions_per_role`);
  }

  changeRolePageAction(rolePageAction: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<any>(`${this.API}/page_action_roles/${rolePageAction.page_id}/${rolePageAction.role_id}/${rolePageAction.action}/${rolePageAction.authorized}/authorize`, rolePageAction, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  changeRolePageAllActions(rolePageActions: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<any>(`${this.API}/page_action_roles/${rolePageActions.page_id}/${rolePageActions.role_id}/${rolePageActions.authorized}/authorize_all`, rolePageActions, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  authorizedPageActions(pageId: number){
    let httpOptions = this.authService.reqOptions();
    return this.http.get<any>(`${this.API}/pages/${pageId}/authorized_page_actions`, httpOptions)
    .pipe(
      tap((data: any) =>
      {}
        //localStorage.setItem('authorizedPageActions', JSON.stringify(data.page_action_roles))
      )    
    )
  }
}
