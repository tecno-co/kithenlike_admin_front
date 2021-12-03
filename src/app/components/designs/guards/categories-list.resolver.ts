import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CategoriesService } from 'src/app/services/categories/categories.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesListResolver implements Resolve<boolean> {
  constructor(
    private categoriesService: CategoriesService,
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): Observable<any> | Promise<any>|any{
      return this.categoriesService.getCategories();
  }
}
