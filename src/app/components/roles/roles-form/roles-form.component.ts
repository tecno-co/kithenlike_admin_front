import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tecno-roles-form',
  templateUrl: './roles-form.component.html',
  styleUrls: ['./roles-form.component.scss']
})
export class RolesFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  rolesForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.rolesForm = this.fb.group({
      name: ['', Validators.required],
      isActive: [true],
      idForOptions: [''],
    });

    if (data != null) {
      this.rolesForm.patchValue(
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
    this.dialogEmit.emit(this.rolesForm);
  }
}
