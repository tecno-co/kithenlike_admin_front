import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'tecno-pages-form',
  templateUrl: './pages-form.component.html',
  styleUrls: ['./pages-form.component.scss']
})
export class PagesFormComponent implements OnInit {

  @Input() page: any;
  @Input() addMode: boolean = false;
  @Output() emitAddPage: EventEmitter<any> = new EventEmitter();
  @Output() emitEditPage: EventEmitter<any> = new EventEmitter();
  @Output() emitDeletePage: EventEmitter<any> = new EventEmitter();

  pageForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {
    
    this.pageForm = this.fb.group({
      id: [''],
      name: [''],
      description: [''],
      icon_id: [''],
      icon: [''],
      menu_module_id: [''],
      route: [''],
      ordering: ['']
    })  
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pageForm.patchValue({
      id: this.page?.id,
      name: this.page?.name,
      description: this.page?.description,
      icon_id: this.page?.iconId,
      icon: this.page?.icon.name,
      menu_module_id: this.page?.moduleId,
      route: this.page?.route,
      ordering: this.page?.ordering
    })
  }

  onEdit() {
    if(this.addMode) {
      this.emitAddPage.emit(this.pageForm);
    } else {
      this.emitEditPage.emit(this.pageForm);

    }    
  }
  
  onDelete() {
    // this.emitDeletePage.emit();
  }
}
