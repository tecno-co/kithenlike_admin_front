import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';

@Injectable({
  providedIn: 'root'
})
export class KeywordsResolver implements Resolve<boolean> {
  
  constructor(private keywordsService: KeywordsService,) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.keywordsService.getKeywords();
  }
}
