import { E } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss']
})
export class ModuleFormComponent implements OnInit {

  @Input() module: any;
  @Input() addMode: boolean = false;
  @Output() emitAddModule: EventEmitter<any> = new EventEmitter();
  @Output() emitEditModule: EventEmitter<any> = new EventEmitter();
  @Output() emitDeleteModule: EventEmitter<any> = new EventEmitter();

  moduleForm: FormGroup

  constructor(
    private fb: FormBuilder
  ) {
    
    this.moduleForm = this.fb.group({
      name: [],
      icon_id: [],
      ordering:[],
      menu_id:[],
      module_id: []
    })    
  }

  ngOnInit(): void {    
  }

  ngOnChanges(changes: SimpleChanges) {

    this.moduleForm.patchValue({
      name: this.module?.name,
      icon_id: this.module?.iconv2.id,
      ordering: this.module?.ordering,
      menu_id: 1,
      module_id: this.module?.id, 
    })
  }

  onEdit() {
    if(this.addMode) {
      this.emitAddModule.emit(this.moduleForm);
    } else {
      this.emitEditModule.emit(this.moduleForm);      
    }    
  }
  
  onDelete() {
    // this.emitDeleteModule.emit();
  }
}
