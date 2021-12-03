import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-designs-form',
  templateUrl: './designs-form.component.html',
  styleUrls: ['./designs-form.component.scss']
})
export class DesignsFormComponent implements OnInit {

  @ViewChild('categoriesInput') categoriesInput!: ElementRef<HTMLInputElement>;
  @ViewChild('keywordsInput') keywordsInput!: ElementRef<HTMLInputElement>;
  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  extendedImageName: any = null;
  image: any = '';
  keywords: any[] = [];
  categories: any[] = [];
  imagePreviewUrl: any = '';


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  designsForm: FormGroup;

  categoryCtrl = new FormControl();
  keywordCtrl = new FormControl();
  filteredCategories!: Observable<any[]>;
  filteredKeywords!: Observable<string[]>;
  allCategories: any[] = [];
  allKeywords: string[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DesignsFormComponent>,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private _sanitizer: DomSanitizer,
  ) {

    this.filteredCategories = this.categoryCtrl.valueChanges.pipe (
      startWith(null),
      map((category: string | null) => category ? this.filterCategories(category) : this.allCategories.slice())
    );

    this.filteredKeywords = this.keywordCtrl.valueChanges.pipe (
      startWith(null),
      map((keyword: string | null) => keyword ? this.filterKeywords(keyword) : this.allKeywords.slice())
    );

    this.designsForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      image: new FormControl(null),
      key_words: new FormControl(''),
      categories: new FormControl(''),
      isActive: new FormControl(true),
    })

    if (data.mode == 'edit') {

      if (data.image.original != null) {
        let name = (data.image.original.split('/'));
        this.extendedImageName = name[name.length-1];
      }

      this.keywords = data.key_words != null ? data.key_words : [];      
      this.categories = data.categories != null ? data.categories : [];

      this.designsForm = this.fb.group({
        code: data.code,
        name: data.name,
        description: data.description,
        image: data.image,
        key_words: '',
        categories: '',
        isActive: data.checkOption,
        idForOptions: data.idForOptions,
      })
    }
  }

  ngOnInit(): void {
    this.allKeywords = this.data.keywordsList;
    this.allCategories = this.data.categoriesList;
  }
        
  create() {
    
    let newCategories = '';
    if (this.categories != null) {
      this.categories.map(s => newCategories == '' ? newCategories = newCategories + s.category_id : newCategories = newCategories + ', ' + s.category_id);
    }
    
    let newKeywords = '';
    if (this.keywords != null) {
      this.keywords.map(k => newKeywords == '' ? newKeywords = newKeywords + k.key_word_name: newKeywords = newKeywords + ', ' + k.key_word_name);
    }

    this.designsForm.patchValue({
      key_words: newKeywords,
      categories: newCategories
   })
    this.dialogEmit.emit(this.designsForm);
  }

  processFile(imageInput: any) {
    const maxSize = 200000;

    this.extendedImageName = null;
    this.designsForm.controls.image.reset;

    let file: File = imageInput.target.files[0];
    
    if (imageInput.target.files[0]){
      if (file?.type == 'image/jpeg' || file?.type == 'image/png'){
  
        if (file?.size <= maxSize) {
          this.extendedImageName = file.name;
          this.designsForm.patchValue({
            image: file
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

  addChipKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push({"key_word_name": value});
    }
    event.chipInput!.clear();
    this.keywordCtrl.setValue(null);
  }

  removeChipKeyword(keywords: string): void {
    const index = this.keywords.indexOf(keywords);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }


  addChipCategory(event: MatChipInputEvent): void {
    this.openSnackBar('Seleccione una opción de la lista', '', 1000, 'error-snack-bar');
  }

  removeChipCategory(category: string): void {
    const index = this.categories.indexOf(category);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }
  
  selectedKeyword(event: string): void {
    this.keywords.push({"key_word_name": event});
    this.keywordsInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }
  
  selectedCategory(event: any): void {
    let newSeasson = {"category_id": event.id, "category_name": event.name};
    let exists: boolean = false;
    this.categories.map(s => s.category_name == newSeasson.category_name ? exists = true : exists = false)
    if (!exists){ 
      this.categories.push({"category_id": event.id, "category_name": event.name});
    }
    this.categoriesInput.nativeElement.value = '';
    this.categoryCtrl.setValue(null);
    this.filteredCategories = this.categoryCtrl.valueChanges.pipe (
      startWith(null),
      map((category: string | null) => category ? this.filterCategories(category) : this.allCategories.slice())
    );
  }

  private filterCategories(value: string): any[] {
    var filterValue: any = '';
    if (typeof(value) == 'string'){
      filterValue = value.toLowerCase();      
    }
    return this.allCategories.filter(category => category.name.toLowerCase().includes(filterValue))
  }

  private filterKeywords(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }

  openSnackBar(message: string, action: string, duration: number, className: string) {
    var panelClass = className;
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }
}
