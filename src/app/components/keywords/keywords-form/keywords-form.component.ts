import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-keywords-form',
  templateUrl: './keywords-form.component.html',
  styleUrls: ['./keywords-form.component.scss']
})
export class KeywordsFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  keywordsForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) {

    this.keywordsForm = new FormGroup({
      name: new FormControl(''),
      description: new FormControl(''),
      checkOption:  new FormControl(''),
    });

    if (data != null) {
      this.keywordsForm = this.fb.group(
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
    this.dialogEmit.emit(this.keywordsForm);
  }
}
