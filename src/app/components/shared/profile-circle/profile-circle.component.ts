import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
  selector: 'app-profile-circle',
  templateUrl: './profile-circle.component.html',
  styleUrls: ['./profile-circle.component.scss']
})
export class ProfileCircleComponent implements OnInit {
  

  @Input() user!: User;
  @Input() size: any = 110;

  constructor(
  ) {}

  ngOnInit(): void {
    if (this.size == null){
      this.size = 35;
    }
  }
}
