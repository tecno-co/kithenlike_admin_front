
import { Component, EventEmitter, Inject, OnInit, Output,} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      is_active:  new FormControl(true),
      idForOptions: new FormControl(''),
    });

    if (data != null) {
      this.seasonsForm = this.fb.group(
        {
          name: data.name,
          description: data.description,
          is_active:  data.checkOption,
          idForOptions: data.idForOptions,
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
