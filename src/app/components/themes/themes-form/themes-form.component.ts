import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-themes-form',
  templateUrl: './themes-form.component.html',
  styleUrls: ['./themes-form.component.scss']
})
export class ThemesFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  code: string = "";
  name: string = "";
  status: boolean = true;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    if (data != null) {
      this.code = this.data.code;
      this.name = this.data.name;    
      this.status = this.data.status;
    }
   }

  ngOnInit(): void {
  }

  create() {
    const inputData = {
      id: this.code,
      code: this.code,
      name: this.name,
      status: this.status}
    // this.dialogRef.close({event:"create",data: inputData});
    this.dialogEmit.emit({mode: "create", data: inputData});
  }

  cancel(){
    /*
    this.dialogEmit.emit({mode: "cancel", data: null});
    */
    this.dialogEmit.emit({mode: "cancel", data: null});
  }
}
