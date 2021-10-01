import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() oInfoPage!: any;
  @Input() fShowLoading!: boolean;

  flagFavorite: boolean = false;
  title: string = "Home";
  description: string = "";
  bgColor: string = "#3F51B5";
  bgFavorite: string = "#fff";

  route: any;

  constructor(
    // private menuService: MenuService,
    // private router: Router,
    //private location: Location
  ) { }

  ngOnInit(): void {
    /*
    true;//environment.consoleMessage("onInit")

    this.fAnimation = false;
    setTimeout(() => { this.fAnimation = true; }, 200);

    if (this.oInfoPage) {
      this.title = this.oInfoPage.name;
      this.description = this.oInfoPage.description;
      // this.bgColor = this.oInfoPage.bg_color;
    }

    this.router.events.subscribe((e: any) => {
        if (e instanceof NavigationEnd) {
          this.route = e.url;
          this.menuService.getOptionByRoute(this.route);
        }
      });

    this.menuService.emitOption.subscribe(option => {
      console.log(option);

      this.oInfoPage = option;

      if (this.oInfoPage.route == '/home') {
        this.title = "Home";
        this.description = "";
      } else {
        this.title = this.oInfoPage.name;
        this.description = this.oInfoPage.description;
      }
      this.fAnimation = false;
      setTimeout(() => { this.fAnimation = true; }, 200);
      // console.log("+++++++++++++++>>infopage", this.oInfoPage);
    });*/
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
