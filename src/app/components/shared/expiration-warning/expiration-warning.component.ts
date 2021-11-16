import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tecno-expiration-warning',
  templateUrl: './expiration-warning.component.html',
  styleUrls: ['./expiration-warning.component.scss']
})
export class ExpirationWarningComponent implements OnInit {

  @Output() emitClose: EventEmitter<any> = new EventEmitter();
  timeOut!: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.timeOut = this.data.time
    window.setInterval((func: any) => {
      this.data.time--;
    }, 1000);

    setTimeout(() => {
      if(this.data.time == 0) {
        this.emitClose.emit(false);
      }
    }, this.timeOut * 1000);
  }

  onClick() {
    this.data.time = this.timeOut;
    this.emitClose.emit(true);
  }
}
