import { Component, Input, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu/menu.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() title?: string;

  flagFavorite: boolean = false;
  description: string = "";
  bgColor: string = "#3F51B5";
  bgFavorite: string = "#fff";

  route: any;

  constructor(
    private menuService: MenuService,
    // private router: Router,
    //private location: Location
  ) { }

  ngOnInit(): void {
    this.menuService.emitPage
    .subscribe(
      (page: any) => {
        this.title = page;
      }
    )
  }

  onFavorite() {
    // this.flagFavorite = !this.flagFavorite;
    // this.bgFavorite = this.flagFavorite ? "accent" : "#fff";
  }

  onBack(){
    // this.location.back();
    console.log("Back")
  }
}
