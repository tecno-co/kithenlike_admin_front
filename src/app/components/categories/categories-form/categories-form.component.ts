import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tecno-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  categoriesForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.categoriesForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      is_active:  new FormControl(true),
      idForOptions: new FormControl(''),
    });

    if (data != null) {
      this.categoriesForm = this.fb.group(
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
    this.dialogEmit.emit(this.categoriesForm);
  }

}
