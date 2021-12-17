import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tecno-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent implements OnInit {

  restrictionsForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {
    this.restrictionsForm = new FormGroup({
      name: new FormControl('', Validators.required),
      is_active:  new FormControl(true),
      idForOptions: new FormControl(''),
    });

    if (data != null) {
      this.restrictionsForm = this.fb.group(
        {
          name: this.data.name,
          is_active:  this.data.checkOption,
          idForOptions: this.data.idForOptions,
        }
      )
    }
  }

  ngOnInit(): void {
  }

  create() {
  }

}
