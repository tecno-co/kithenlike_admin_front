import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ThemesService } from 'src/app/services/themes/themes.service';

@Injectable({
  providedIn: 'root'
})
export class ThemesResolver implements Resolve<boolean> {

  constructor(private themeService: ThemesService,) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.themeService.getThemes();
  }
}
