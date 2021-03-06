import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user/user';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-menu-b',
  templateUrl: './menu-b.component.html',
  styleUrls: ['./menu-b.component.scss']
})
export class MenuBComponent implements OnInit {


  // icons: Icon[] = [];
  menu: any[] = [];
  getmenusSuccses: boolean = false;
  panelOpenState: boolean [] = []; // Array de flags para saber si esta abierto o no un panel
  // panelOpenState: boolean = false;
  moduleSelected: number = 1;
  currentYear: number = new Date().getFullYear();
  user!: User;

  constructor(
    private menuService: MenuService,
    private router: Router,
    // private _iconsService: IconsService
  ) {}

  ngOnInit(): void {
    // this._iconsService.getIcons()
    //   .subscribe(icons => this.icons = icons);
    this.user = new User({
      id: 1,
      first_name: 'Kevin',
      last_name: 'Garzón',
      email: 'kevin.garzon@tecno.co'
    });

    this.getMenu();
  }

  getMenu() {
    this.menuService.getFullMenu().subscribe((data: any) => {
      this.menu = this.menuService.getMenu;
    });;
    // if (sessionStorage.menuLoaded != null) {
    //   if (!this.getmenusSuccses) {
    //     this._usersService.getMenu().then(menu =>
    //       {
    //         this.menu = menu;
    //         this.getmenusSuccses = true;
    //       }
    //     );
    //   }
    /*
    this.menuService.getFullMenu()
      .subscribe(data => {
        this.menu = this.menuService.getMenu;
        this.menu.forEach(module => this.panelOpenState.push(false));
        return this.menu;
      })*/
    // }
  }

  onOpenOption(index: number) {
    this.panelOpenState[index] = true;
  }

  onCloseOption(index: number) {
    this.panelOpenState[index] = false;
  }

  getIcon(id: number) {
    // return this.icons.filter(icon => icon.id == id)[0].name;
  }

  onLink(route: string) {
    // this.menuService.getOptionByRoute(route);
  }
}
