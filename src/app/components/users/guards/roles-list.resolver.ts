import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { RolesService } from 'src/app/services/roles/roles.service';

@Injectable({
  providedIn: 'root'
})
export class RolesListResolver implements Resolve<boolean> {
  
  constructor(private rolesService: RolesService,) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.rolesService.getRoles();
  }
}
