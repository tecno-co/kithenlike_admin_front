import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { TableData } from 'src/app/models/table-data/table-data';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/auth.service';


@Injectable({
  providedIn: 'root'
})
export class DesignsService {
  

  private readonly API = `${environment.API}`;

  emitDataTable = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getDesigns() {
    let httpOptions = this.authService.reqOptions();
    return this.http.get<TableData>(`${this.API}/designs/list` , httpOptions)
    .pipe();
  }

  addDesign(design: any) {
    let httpOptions: any = this.authService.reqOptions();
    let designFormData = new FormData();
    
    designFormData.append('design[name]', design.name);
    designFormData.append('design[description]', design.description);
    designFormData.append('design[key_words]', design.key_words);
    designFormData.append('design[seasons]', design.seasons);
    designFormData.append('design[is_active]', design.isActive);

    if (design.image.original != undefined) {
      designFormData.append('design[image]', design.image);
    }

    return this.http.post<any>(`${this.API}/designs`, designFormData, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  updateDesign(design: any) {
    let httpOptions = this.authService.reqOptions();

    let designFormData = new FormData();

    designFormData.append('design[name]', design.name);
    designFormData.append('design[description]', design.description); 
    designFormData.append('design[key_words]', design.key_words);
    designFormData.append('design[seasons]', design.seasons);
    designFormData.append('design[is_active]', design.isActive);

    let noImage = !(design.image.original || design.image.original == null);
    if (noImage) {
      designFormData.append('design[image]', design.image);
    }

    return this.http.put<any>(`${this.API}/designs/${design.idForOptions}`, designFormData, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }

  deleteDesign(design: any) {
    let httpOptions = this.authService.reqOptions();
    return this.http.put<any>(`${this.API}/designs/${design.idForOptions}/logical_delete`, design, httpOptions)
    .pipe(
      tap((data: any) => 
        this.emitDataTable.emit(data),
      )
    );
  }
  
}
