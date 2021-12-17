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
  interval: any;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    
    if (!this.interval) {
      this.timeOut = this.data.time
      this.interval = window.setInterval((func: any) => {
        this.timeOut--;
        if(this.timeOut <= 0) {
          clearInterval(this.interval);
          this.interval = null;
          this.emitClose.emit(false);
        }
      }, 1000);

    }

  }

  onClick() {
    clearInterval(this.interval);
    this.timeOut = this.timeOut;
    this.interval = null;
    this.emitClose.emit(true);
  }
}
