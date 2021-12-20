import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  
  themeEmmiter: EventEmitter<any> = new EventEmitter();
  loadingEmmiter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setTheme(){
    this.themeEmmiter.emit();
  }

  showLoading() {
    this.loadingEmmiter.emit(true);
  }

  hideLoading() {
    this.loadingEmmiter.emit(false);
  }  
}
