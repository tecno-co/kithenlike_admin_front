import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { MainService } from '../services/main/main.service';
import { MenuService } from '../services/menu/menu.service';
import { PermissionsService } from '../services/permissions/permissions.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuService: MenuService,
    private permissionsService: PermissionsService,
    private mainService: MainService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.mainService.showLoading();
    var subject = new Subject<any>();
    var isAuthenticated = false;
    this.authService.isAuthenticated().subscribe( value => {
      isAuthenticated = value;
      this.menuService.getFullPages().subscribe((pages) => {
        let pathName = this.router.parseUrl(state.url).root.children['primary'].segments.map(it => it.path).join('/');
        let pageId = pages.filter((page: any)=> page.route == '/'+ pathName)[0]?.id;
        this.permissionsService.authorizedPageActions(pageId).subscribe((res) => {
          localStorage.setItem('authorizedPageActions', JSON.stringify(res.page_action_roles || res))
          subject.next(isAuthenticated)
        });
      });
    }).unsubscribe();
    return subject.asObservable();
  }  

}
