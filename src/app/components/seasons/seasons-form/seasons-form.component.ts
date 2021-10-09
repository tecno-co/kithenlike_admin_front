
import { Component, EventEmitter, Inject, OnInit, Output,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-seasons-form',
  templateUrl: './seasons-form.component.html',
  styleUrls: ['./seasons-form.component.scss']
})

export class SeasonsFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  seasonsForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.seasonsForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      checkOption:  new FormControl(true),
    });

    if (data != null) {
      this.seasonsForm = this.fb.group(
        {
          name: this.data.name,
          description: this.data.description,
          checkOption:  this.data.checkOption,
        }
      )
    }
  }
  
  ngOnInit(): void {
  }

  create() {
    this.dialogEmit.emit(this.seasonsForm);
  }
}
