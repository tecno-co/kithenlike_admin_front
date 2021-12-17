import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  private readonly API = `${environment.API}`;
  emitMenu = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  addModule(module: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<any>(`${this.API}/menu_modules`, module, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitMenu.emit(data),
      )
    );
  }

  updateModule(module: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/menu_modules/${module.menu_module.id}`, module, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitMenu.emit(data),
      )
    );
  }

  addPage(page: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<any>(`${this.API}/pages`, page, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitMenu.emit(data),
      )
    );
  }

  updatePage(page: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/pages/${page.page.id}`, page, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitMenu.emit(data),
      )
    );
  }
}
