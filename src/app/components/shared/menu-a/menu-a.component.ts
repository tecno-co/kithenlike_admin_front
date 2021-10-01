import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Menu } from 'src/app/models/menu/menu';
import { User } from 'src/app/models/user/user';
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
  ) { }

  ngOnInit(): void {
    this.user = new User({
      id: 1,
      first_name: 'Kevin',
      last_name: 'Garzón',
      email: 'kevin.garzon@tecno.co'
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
    });;
    /*
    this.menuService.getFullMenu()
      .subscribe(data => {
        this.menu = this.menuService.getMenu;
        return this.menu;
    })*/
  }
}