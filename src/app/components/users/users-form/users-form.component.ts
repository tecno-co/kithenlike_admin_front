import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'tecno-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  userForm: FormGroup;

  profiles: any = ['Comercial', 'Administrador', 'Sistema'];

  hidePassword: boolean = true;

  newPassword: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ) {

    this.userForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      lastName: new FormControl(''),
      profile: new FormControl(''),
      password: new FormControl(''),
      isActive: new FormControl(true),
    })

    if (data != null) {

      this.newPassword = false;
      
      this.userForm = this.fb.group(
        {
          name: this.data.name,
          lastName: this.data.last_name,
          email: this.data.email,
          profile: this.data.profile,
          isActive: this.data.is_active,
          idForOptions: this.data.idForOptions,
        }
      )
    }

  }

  ngOnInit(): void {
  }

  create(){
    console.log(this.userForm);
    // this.dialogEmit.emit(this.userForm);
  }

}
