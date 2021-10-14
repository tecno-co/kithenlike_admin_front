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
        tap((data: any) => this._menu = data)
      );
  }

  get getMenu(): Menu [] { return this._menu }

  get getOption(): any { return this._oOption }

  set setMenu(menu: Menu []) { this._menu = menu }

  set setOption(oOption: any) { this._oOption = oOption }

}
