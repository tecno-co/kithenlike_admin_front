import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { PermissionsService } from 'src/app/services/permissions/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class PagePermissionsResolver implements Resolve<boolean> {

  constructor(
    private permissionsService: PermissionsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      let roleId = Number(route.queryParamMap.get('role_id')) || 0;
      this.permissionsService.setRoleId(roleId);
      return this.permissionsService.getRolePageAllActions();
  }
}
