import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { MenuService } from 'src/app/services/menu/menu.service';

@Injectable({
  providedIn: 'root'
})
export class MenuResolver implements Resolve<boolean> {
  constructor(private menuService: MenuService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.menuService.getFullMenu();
  }
}
