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
  
  private readonly API = `${environment.API}`;
  private _menu: Menu[] = [];
  private _page: string = 'Home';
  private _pages: any[] = [];
  emitPage = new EventEmitter<any>();

  inputParams: any = {
    user_email: "",
    user_token: ""
  };

  httpOptions!: any;

  menuFull!: Menu[]

  constructor(private http: HttpClient) { }

  getFullMenu() {
    return this.http.get<Menu[]>(`${this.API}/menus/1/modules_pages`)
      .pipe(
        tap((data: any) => this._menu = data)
    );
  }

  get getMenu(): Menu [] { return this._menu }
  set setMenu(menu: Menu []) { this._menu = menu }

  getPage(): any { return this._page }
  
  getPages(): any { return this._pages }

  setPage(page: any) { this.emitPage.emit(this._page); this._page = page }

  getFullPages(){
    return this.http.get<any[]>(`${this.API}/pages`)
      .pipe(
        tap((data: any) => this._pages = data)
    );
  }
}
