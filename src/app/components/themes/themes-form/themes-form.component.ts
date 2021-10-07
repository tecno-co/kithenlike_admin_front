import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-themes-form',
  templateUrl: './themes-form.component.html',
  styleUrls: ['./themes-form.component.scss']
})
export class ThemesFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  themeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.themeForm = new FormGroup({
      name: new FormControl(''),
      theme_class: new FormControl(''),      
    });

    if (data != null) {
      this.themeForm = this.fb.group(
        {
          name: this.data.name,
          theme_class: this.data.theme_class,
        }
      )
    }
   }

  ngOnInit(): void {
  }

  create() {
    this.dialogEmit.emit(this.themeForm);
  }

  cancel(){
    // this.dialogEmit.emit({mode: "cancel", data: null});
  }
}
