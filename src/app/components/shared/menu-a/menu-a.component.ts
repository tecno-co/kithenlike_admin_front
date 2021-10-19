import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu/menu';
import { User } from 'src/app/models/user/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-a',
  templateUrl: './menu-a.component.html',
  styleUrls: ['./menu-a.component.scss'],
})
export class MenuAComponent implements OnInit {

  overOption: string = "";
  overButton: boolean = false;
  extendedMenu: boolean = false;
  selectedModule: string = "";
  menu: Menu[] = [];
  pages: any[] = [];
  size: number = 50;
  user!: User;

  constructor(
    private menuService: MenuService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    let uid = this.authService.getAuthData()?.uid;
    let fullname = uid?.split('@')[0]?.split('.');
    this.user = new User({
      id: 1,
      first_name: fullname[0]?.charAt(0)?.toUpperCase() + fullname[0]?.slice(1),
      last_name: fullname[1]?.charAt(0)?.toUpperCase() + fullname[1]?.slice(1),
      email: uid,
    });
    this.getMenu();
  }

  toggleExtendedMenu(module: any, pages: any) {
    this.pages = pages;
 
    if (module != this.selectedModule) {
      this.extendedMenu = true;
      this.selectedModule = module;
    } else {
      this.extendedMenu = !this.extendedMenu;
    }

    if (this.extendedMenu) {
      this.size = 100;
    } else {
      this.size = 50;
    }
  }
  
  getMenu() {
    this.menuService.getFullMenu().subscribe((data: any) => {
      this.menu = this.menuService.getMenu;
    });
  }

  setPage(page: any){
    this.menuService.setPage(page.name);
  }
}