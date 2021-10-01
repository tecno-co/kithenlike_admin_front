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

  @ViewChild('seasonInput') seasonInput!: ElementRef<HTMLInputElement>;
  @Output() dialogEmit: EventEmitter<any> = new EventEmitter();
  
  extendedImageName: any = null;

  code: String = "";
  name: String = "";
  description: String = "";
  img: String = '';
  keywords: String[] = [];
  seasons: string[] = [];
  status: boolean = true;

  readonly separatorKeysCodes = [ENTER, COMMA] as const;


  seasonCtrl = new FormControl();
  filteredSeasons!: Observable<string[]>;
  allSeasons: string[] = ['navidad', 'dia de los niños', 'dia da la madre'];
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DesignsFormComponent>,
    private fb: FormBuilder
  ) {
    this.filteredSeasons = this.seasonCtrl.valueChanges.pipe (
      startWith(null),
      map((season: string | null) => season ? this._filter(season) : this.allSeasons.slice())
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

  cancel(){
    this.dialogEmit.emit({mode: "cancel", data: null});
  }

  onFileSelected(e: any) {
    this.extendedImageName = e.target.files[0].name;
  }

  // Chips Component Methods
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.keywords.push(value);
    }
    event.chipInput!.clear();
  }

  // Chips Component Methods
  remove(keyword: String): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }


  addSeason(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.seasons.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.seasonCtrl.setValue(null);
  }

  removeSeason(season: string): void {
    const index = this.seasons.indexOf(season);

    if (index >= 0) {
      this.seasons.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.seasons.push(event.option.viewValue);
    this.seasonInput.nativeElement.value = '';
    this.seasonCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allSeasons.filter(season => season.toLowerCase().includes(filterValue));
  }
}
