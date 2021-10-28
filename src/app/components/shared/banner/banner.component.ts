import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';
import { Location } from '@angular/common'
import { Observable } from 'rxjs';
import { C } from '@angular/cdk/keycodes';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  title: string = "Home";

  flagFavorite: boolean = false;
  description: string = "";
  bgColor: string = "#3F51B5";
  bgFavorite: string = "#fff";

  route: any;

  constructor(
    private menuService: MenuService,
    // private router: Router,
    private location: Location,
  ) {
    this.menuService.getPage().subscribe((res:any) => {
      this.title = res;
    });
  }

  ngOnInit(): void {

  }

  onFavorite() {
    // this.flagFavorite = !this.flagFavorite;
    // this.bgFavorite = this.flagFavorite ? "accent" : "#fff";
  }

  onBack(){
    this.location.back();
    //console.log("Back")
  }
}
