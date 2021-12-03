import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private readonly API = `${environment.API}`;
  
  emitDataTable = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getCategories() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/categories/list` , httpOptions)
    .pipe();
  }

  addCategory(category: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.post<TableData>(`${this.API}/categories`, category, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateCategory(category: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/categories/${category.idForOptions}`, category, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateCategoryStatus(category: any) {
    category.is_active = category.checkOption;
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/categories/${category.idForOptions}`, category, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  deleteCategory(category: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/categories/${category.idForOptions}/logical_delete`, category, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
}
