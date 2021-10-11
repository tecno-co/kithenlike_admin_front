import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';

@Injectable({
  providedIn: 'root'
})
export class SeasonsListResolver implements Resolve<boolean> {
  constructor(private seasonsService: SeasonsService,) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.seasonsService.getSeasons();
  }
}
