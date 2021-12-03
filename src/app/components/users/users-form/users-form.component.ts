import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tecno-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent implements OnInit {

  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  extendedImageName: any = null;
  userForm: FormGroup;
  hidePassword: boolean = true;
  newPassword: boolean = true;
  imagePreviewUrl: any = '';
  roles: any = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer,
  ) {
    this.roles = this.data.allRoles;
    this.userForm = this.fb.group({
      avatar: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email:['', [Validators.required, Validators.email]],
      roles: ['', Validators.required],
      hasAccess: [false],
      password: ['', [Validators.minLength(6)]],
      isActive: [true],
    })

    if (data.mode == 'edit') {
     
      if (data.avatar.original != null) {
        let name = (data.avatar.original.split('/'));
        this.extendedImageName = name[name.length-1];
      }

      this.newPassword = false;
      
      this.userForm.patchValue(
        {
          avatar: this.data.avatar,
          name: this.data.first_name,
          lastName: this.data.last_name,
          email: this.data.email,
          roles: this.data.roles,
          hasAccess: this.data.hasAccess,
          password: '',
          isActive: this.data.checkOption,
        }
      )
    }
  }

  ngOnInit(): void {
  }

  create(){
    let user = new FormData();
    user.append('idForOptions', this.data.idForOptions);
    user.append('person[avatar]', this.userForm.value.avatar);
    if (this.userForm.value.hasAccess && this.userForm.value.password) {
      user.append('person[first_name]', this.userForm.value.name);
      user.append('person[last_name]', this.userForm.value.lastName);
      user.append('person[email]', this.userForm.value.email);
      user.append('user[email]', this.userForm.value.email);
      user.append('user[password]', this.userForm.value.password);
      user.append('user[password_confirmation]', this.userForm.value.password);
      user.append('role[first_name]', this.userForm.value.roles);
    } else {
      this.userForm.patchValue({hasAccess: false});
      user.append('person[first_name]', this.userForm.value.name);
      user.append('person[last_name]', this.userForm.value.lastName);
      user.append('person[email]', this.userForm.value.email);

    // if (this.userForm.value.hasAccess && this.userForm.value.password) {
    //   user = {
    //     person: {
    //       first_name: this.userForm.value.name,
    //       last_name: this.userForm.value.lastName,
    //       email: this.userForm.value.email
    //     },
    //     user: {
    //       email: this.userForm.value.email,
    //       password: this.userForm.value.password,
    //       password_confirmation: this.userForm.value.password,
    //     },
    //     role: {name: this.userForm.value.roles},
    //     idForOptions: this.data.idForOptions,
    //   }
    // } else {
    //   this.userForm.patchValue({hasAccess: false});
    //   user = {
    //     idForOptions: this.data.idForOptions,
    //     person: {
    //       first_name: this.userForm.value.name,
    //       last_name: this.userForm.value.lastName,
    //       email: this.userForm.value.email
    //     }
    //   }
    }
    this.dialogEmit.emit(user);
  }

  changeAccess() {
    if (this.userForm.value.hasAccess) {
      this.userForm.patchValue({password: ''});
    }
  }

  processFile(imageInput: any) {
    const maxSize = 200000;
    this.userForm.controls.avatar.reset;
    this.extendedImageName = null;
    let file: File = imageInput.target.files[0];
    
    if (imageInput.target.files[0]){
      if (file?.type == 'image/jpeg' || file?.type == 'image/png'){
  
        if (file?.size <= maxSize) {
          this.extendedImageName = file.name;
          this.userForm.patchValue({
            avatar: file
          })
          this.imagePreviewUrl = this._sanitizer.bypassSecurityTrustResourceUrl(URL.createObjectURL(file));
        } else {
          this.openSnackBar('Tamaño maximo superado', '', 2000, 'error-snack-bar');
        }
        
      } else {
        this.openSnackBar('Tipo de archivo no permitido', '', 2000, 'error-snack-bar');
      }
    }      
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

}
