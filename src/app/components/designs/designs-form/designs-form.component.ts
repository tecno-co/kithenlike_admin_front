import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ThrowStmt } from '@angular/compiler';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { KeywordsService } from 'src/app/services/keywords/keywords.service';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';

@Component({
  selector: 'app-designs-form',
  templateUrl: './designs-form.component.html',
  styleUrls: ['./designs-form.component.scss']
})
export class DesignsFormComponent implements OnInit {

  @ViewChild('seasonsInput') seasonInput!: ElementRef<HTMLInputElement>;
  @ViewChild('keywordsInput') keywordsInput!: ElementRef<HTMLInputElement>;
  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  extendedImageName: any = null;
  
  image: any = '';
  keywords: any[] = [];
  seasons: any[] = [];


  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  designsForm: FormGroup;

  seasonCtrl = new FormControl();
  keywordCtrl = new FormControl();
  filteredSeasons!: Observable<any[]>;
  filteredKeywords!: Observable<string[]>;
  allSeasons: any[] = [];
  allKeywords: string[] = [];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DesignsFormComponent>,
    private fb: FormBuilder,
    private keywordsService: KeywordsService,
    private seasonsService: SeasonsService,
    private _snackBar: MatSnackBar,
  ) {

    this.filteredSeasons = this.seasonCtrl.valueChanges.pipe (
      startWith(null),
      map((season: string | null) => season ? this.filterSeasons(season) : this.allSeasons.slice())
    );

    this.filteredKeywords = this.keywordCtrl.valueChanges.pipe (
      startWith(null),
      map((keyword: string | null) => keyword ? this.filterKeywords(keyword) : this.allKeywords.slice())
    );

    this.designsForm = new FormGroup({
      code: new FormControl(''),
      name: new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      key_words: new FormControl(''),
      seasons: new FormControl(''),
      checkOption: new FormControl(''),
    })

    if (data.mode == 'edit') {

      if (data.image.original != null) {
        let name = (data.image.original.split('/'));
        this.extendedImageName = name[name.length-1];
      }
      this.keywords = data.key_words;
      this.seasons = data.seasons;

      this.designsForm = this.fb.group({
        code: data.code,
        name: data.name,
        description: data.description,
        image: data.image,
        key_words: '',
        seasons: '',
        checkOption: data.checkOption,
        idForOptions: data.idForOptions,
      })
    } 

  }

  ngOnInit(): void {
    this.allKeywords = this.data.keywordsList;
    this.allSeasons = this.data.seasonsList;
  }
        
  create() {
    
    let newSeasons = '';
    this.seasons.map(s => newSeasons == '' ? newSeasons = newSeasons + s.design_season_id : newSeasons = newSeasons + ', ' + s.design_season_id);
    
    let newKeywords = '';
    this.keywords.map(k => newKeywords == '' ? newKeywords = newKeywords + k.key_word_name: newKeywords = newKeywords + ', ' + k.key_word_name);

    this.designsForm.patchValue({
      key_words: newKeywords,
      seasons: newSeasons
   })

    this.dialogEmit.emit(this.designsForm);
  }

  processFile(imageInput: any) {
    const file: File = imageInput.target.files[0];
    this.extendedImageName = file.name;

    this.designsForm.patchValue({
       image: file
    })    
  }

  addChipKeyword(event: MatChipInputEvent): void {
    console.log(this.keywords)
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


  addChipSeason(event: MatChipInputEvent): void {
    this.openSnackBar('Seleccione una opción de la lista', '', 1000, 'error-snack-bar');
  //   const value = (event.value || '').trim();

  //   // Add our fruit
  //   if (value) {
  //     this.seasons.push({"season_name": value});
  //   }

  //   // Clear the input value
  //   event.chipInput!.clear();

  //   this.seasonCtrl.setValue(null);
  }

  removeChipSeason(season: string): void {
    const index = this.seasons.indexOf(season);

    if (index >= 0) {
      this.seasons.splice(index, 1);
    }
  }
  
  selectedKeyword(event: string): void {
    console.log(this.keywords)
    this.keywords.push({"key_word_name": event});
    this.keywordsInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }
  
  selectedSeason(event: any): void {
    console.log(this.seasons);
    let newSeasson = {"design_season_id": event.id, "season_name": event.name};
    let exists: boolean = false;
    this.seasons.map(s => s.season_name == newSeasson.season_name ? exists = true : exists = false)
    if (!exists){ 
      this.seasons.push({"design_season_id": event.id, "season_name": event.name});
    }
    this.seasonInput.nativeElement.value = '';
    this.seasonCtrl.setValue(null);
    this.filteredSeasons = this.seasonCtrl.valueChanges.pipe (
      startWith(null),
      map((season: string | null) => season ? this.filterSeasons(season) : this.allSeasons.slice())
    );
  }

  private filterSeasons(value: string): any[] {
    var filterValue: any = '';
    if (typeof(value) == 'string'){
      filterValue = value.toLowerCase();      
    }
    return this.allSeasons.filter(season => season.name.toLowerCase().includes(filterValue))
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
