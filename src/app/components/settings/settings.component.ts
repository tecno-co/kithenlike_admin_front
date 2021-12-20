import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main/main.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  authorizedActions: any;

  selectedOption: number = 1;

  settings = [
    {id: 1, title: 'General'},
    {id: 2 , title:'Restricciones Contraseña'},
  ]

  menus = [
    {id: 1, name: 'Menú pequeño'},
    {id: 2, name: 'Menú grande'},
  ]

  constructor(
    private mainService: MainService,    
  ) { }

  ngOnInit(): void {
    this.authorizedActions = JSON.parse(localStorage.getItem('authorizedPageActions')!);
    setTimeout(() => {this.mainService.hideLoading()}, 0);
  }

  changeOption(option: any) {
    console.log(option);
    this.selectedOption = option.id;
  }
}
