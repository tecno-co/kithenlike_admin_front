import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Menu } from 'src/app/models/menu/menu';
import { environment } from 'src/environments/environment';

export interface Page {
  id: number;
  name: string;
  description: string;
  route: string;
  ordering: number;
  is_active: boolean;
  bg_color: string;
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  menu: any[] = [
    {
      module: {
        created_at: "2021-03-16T22:30:00.000Z",
        deleted_at: null,
        id: 1,
        is_active: true,
        is_delete: false,
        name: "Maestros",
        icon_name: "dns",
        ordering: 1,
        updated_at: "2021-03-16T22:30:00.000Z",
        user_creates_id: null,
        user_delete_id: null,
        user_updates_id: 1,
      },
      pages: [
        {
          description: "Maestro de diseños",
          icon_name: "link_off",
          name: "Diseños",
          route: "/diseños",
        },
        {
          description: "Maestro de temporadas",
          icon_name: "link_off",
          name: "Temporadas",
          route: "/temporadas",
        },
        {
          description: "Maestro de temas",
          icon_name: "link_off",
          name: "Temas",
          route: "/themes",
        }
      ]
    },
    {
      module: {
        created_at: "2021-03-16T22:30:00.000Z",
        deleted_at: null,
        id: 1,
        is_active: true,
        is_delete: false,
        name: "Ajustes",
        icon_name: "settings",
        ordering: 1,
        updated_at: "2021-03-16T22:30:00.000Z",
        user_creates_id: null,
        user_delete_id: null,
        user_updates_id: 1,
      },
      pages: [
        {
          description: "Ajustes de apariencia",
          icon_name: "link_off",
          name: "Apariencia",
          route: "/ajustes",
        },
        {
          description: "Ajustes de aplicación",
          icon_name: "link_off",
          name: "Aplicación",
          route: "/ajustes",
        }        
      ]
    }
  ];
  
  private readonly API = `${environment.API}/menus`;
  private _menu: Menu[] = [];
  private _oOption!: Page;
  emitOption = new EventEmitter<any>();

  inputParams: any = {
    user_email: "",
    user_token: ""
  };

  httpOptions!: any;

  menuFull!: Menu[]

  constructor(private http: HttpClient) { }

  getFullMenu() {
    // return this.menu
    
    if (localStorage.user) {
      this.inputParams.user_email = JSON.parse(localStorage.user).email;
      this.inputParams.user_token = JSON.parse(localStorage.user).authentication_token;
    }

    this.httpOptions = {
      headers: new HttpHeaders({
        // Authorization: `Bareer ${localStorage.token}`
        Authorization: `Bareer `
      }),
      params: this.inputParams
      
    };


    return this.http.get<Menu[]>(`${this.API}`)
      .pipe(
        // catchError(this.handleError)
        tap((data: any) => this._menu = data)
        // tap(console.log)
      );
  }

  get getMenu(): Menu [] { return this._menu }

  get getOption(): any { return this._oOption }

  set setMenu(menu: Menu []) { this._menu = menu }

  set setOption(oOption: any) { this._oOption = oOption }

  getOptionByRoute(route: string) :any{
    /*
    let oOption!: Page;

    this._menu.filter((data: any) => {
      data.pages.forEach((page: Page) => {
        if (route === page.route) {
          oOption = page;
        }
      });

    });

    if (oOption) {
      this.emitOption.emit(oOption);
    }

    // return oOption;
    */
  }
}
