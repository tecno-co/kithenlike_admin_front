import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { DesignsService } from 'src/app/services/designs/designs.service';

@Injectable({
  providedIn: 'root'
})
export class DesignsResolver implements Resolve<boolean> {

  constructor(
    private designsService: DesignsService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.designsService.getDesigns();
  }
}
