import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

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

  code: string = "";
  name: string = "";
  description: string = "";
  img: string = '';
  keywords: string[] = [];
  seasons: string[] = [];
  status: boolean = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;

  seasonCtrl = new FormControl();
  keywordCtrl = new FormControl();
  filteredSeasons!: Observable<string[]>;
  filteredKeywords!: Observable<string[]>;
  allSeasons: string[] = ['navidad', 'dia de los niños', 'dia da la madre'];
  allKeywords: string[] = ['oscuro', 'niños', 'madre'];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DesignsFormComponent>,
    private fb: FormBuilder
  ) {
    this.filteredSeasons = this.seasonCtrl.valueChanges.pipe (
      startWith(null),
      map((season: string | null) => season ? this._filter(season) : this.allSeasons.slice())
    );

    this.filteredKeywords = this.keywordCtrl.valueChanges.pipe (
      startWith(null),
      map((keyword: string | null) => keyword ? this._filter(keyword) : this.allKeywords.slice())
    );

    if (data != null) {
      this.code = this.data.code;
      this.name = this.data.name;
      this.img = this.data.img;
      this.extendedImageName = this.data.img.slice(14,this.data.img.length);
      this.description = this.data.description;
      this.keywords = this.data.keywords;
      this.seasons = this.data.seasons;
      this.status = this.data.status;
    } 
  }

  ngOnInit(): void {
  }
        
  create() {
    
    if (this.extendedImageName != null){
      this.img = 'assets/images/' + this.extendedImageName;
    }
    const inputData = {
      id: this.code,
      code: this.code,
      name: this.name,
      description: this.description,
      img: this.img,
      keywords: this.keywords,
      seasons: this.seasons,
      status: this.status}
    this.dialogEmit.emit({mode: "create", data: inputData});
  }

  onFileSelected(e: any) {
    this.extendedImageName = e.target.files[0].name;
  }

  addChipKeyword(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
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
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.seasons.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.seasonCtrl.setValue(null);
  }

  removeChipSeason(season: string): void {
    const index = this.seasons.indexOf(season);

    if (index >= 0) {
      this.seasons.splice(index, 1);
    }
  }
  
  selectedKeyword(event: MatAutocompleteSelectedEvent): void {
    this.keywords.push(event.option.viewValue);
    this.keywordsInput.nativeElement.value = '';
    this.keywordCtrl.setValue(null);
  }
  
  selectedSeason(event: MatAutocompleteSelectedEvent): void {
    this.seasons.push(event.option.viewValue);
    this.seasonInput.nativeElement.value = '';
    this.seasonCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSeasons.filter(season => season.toLowerCase().includes(filterValue));
  }
}
