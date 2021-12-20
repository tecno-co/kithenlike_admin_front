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

  copyright = '© ' + new Date().getFullYear() + ' Copyright:'
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
    let userInfo = JSON.parse(localStorage.getItem('user')!);
    this.user = new User({
      id: userInfo.user.id,
      full_name: userInfo.person.full_name,
      email: userInfo.user.uid,
      //avatar: 'http://localhost:3000/rails/active_storage/disk/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdDVG9JYTJWNVNTSWhlbTltZEhjek9HTjVZbkJ2ZEdzMmFHbHVZbUV6WW5kdmRHOTNlZ1k2QmtWVU9oQmthWE53YjNOcGRHbHZia2tpUDJsdWJHbHVaVHNnWm1sc1pXNWhiV1U5SW1GMllYUmhjaTV3Ym1jaU95Qm1hV3hsYm1GdFpTbzlWVlJHTFRnbkoyRjJZWFJoY2k1d2JtY0dPd1pVT2hGamIyNTBaVzUwWDNSNWNHVkpJZzVwYldGblpTOXdibWNHT3daVU9oRnpaWEoyYVdObFgyNWhiV1U2Q214dlkyRnMiLCJleHAiOiIyMDIxLTEyLTAzVDEyOjA3OjU5LjYzN1oiLCJwdXIiOiJibG9iX2tleSJ9fQ==--8dee770de17d5a3c838a728c14f19e4498b2adc5/avatar.png',
      avatar: userInfo.person.avatar,
      initials_name: userInfo.person.initials_name      
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
}