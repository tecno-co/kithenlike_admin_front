import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER}  from '@angular/cdk/keycodes';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignsService } from 'src/app/services/designs/designs.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit {
    
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  filteredSeasons!: Observable<any[]>;
  filteredKeywords!: Observable<string[]>;

  @Input("seasons") allSeasons: any[] = [];
  @Input("keywords") allKeywords: string[] = [];

  @Input("headers") tableHeaders: string[] = [];
  @Input("data") tableData!: any[];
  @Input("filter") filter: boolean = false;

  @Output() image: EventEmitter<string> = new EventEmitter();
  @Output() emitAdd: EventEmitter<number> = new EventEmitter();
  @Output() emitEdit: EventEmitter<number> = new EventEmitter();
  @Output() emitDelete: EventEmitter<any> = new EventEmitter();
  
  dataSource =  new MatTableDataSource<any>();
  tableCols: any[] = [];
  formControl = new FormControl(['angular']);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  copied: boolean = false;

  filterKeywords = new FormControl();
  filterSeasons = new FormControl();

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public service: DesignsService
  ) { }

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    this.tableCols = (this.tableData && this.tableData.length > 0) ?  Object.keys(this.tableData[0]) : [];     
    setTimeout(() => this.dataSource.paginator = this.paginator);

    this.filteredKeywords = this.filterKeywords.valueChanges.pipe (
      startWith(null),
      map((keyword: string | null) => keyword ? this.filtersKeywords(keyword) : this.allKeywords.slice())
    );

    this.filteredSeasons = this.filterSeasons.valueChanges.pipe (
      startWith(null),
      map((season: string | null) => season ? this.filtersSeasons(season) : this.allSeasons.slice())
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dataSource.data = this.tableData;
  }
  
  // Sends path of image in table
  onSelectImage(path: string) {
    this.image.emit(path);
  }

  // Chips Component Methods
  add(event: MatChipInputEvent, keywords: String[]): void {
    const value = (event.value || '').trim();

    if (value) {
      keywords.push(value);
    }

    event.chipInput!.clear();
  }

  remove(keyword: String, keywords: String[]): void {

    const index = keywords.indexOf(keyword);

    if (index >= 0) {
      keywords.splice(index, 1);
    }
  }

  onAdd() {
    this.emitAdd.emit();
  }

  onEdit(row: any) {
    this.emitEdit.emit(row);
  }

  onDelete(theme: any) {
    this.emitDelete.emit(theme);
  }

  clipboardCopy(value: string) {   
    return value;
  }

  clipboardCopied() {
    this.openSnackBar('Copiado', 'Cerrar', 1000)
  }

  openSnackBar(message: string, action: string, duration: number) {
    var panelClass = "succes-snack-bar";
    this._snackBar.open(message, action, {
      duration: duration,
      panelClass: panelClass
    });
  }

  clearFilter(){
    this.filterKeywords.reset();
    this.filterSeasons.reset();
    this.dataSource.data = this.tableData;
  }

  applyFilter() {
    this.dataSource.data = this.tableData;


    if (this.filterKeywords.value != null && this.filterSeasons.value != null) {
      this.dataSource.data = this.dataSource.data.filter((data: any)=> data.key_words.some((e: any) => e.key_word_name == this.filterKeywords.value) && data.seasons.some((e: any) => e.season_name == this.filterSeasons.value));
    } else {

      if (this.filterKeywords.value != null) {
        this.dataSource.data = this.dataSource.data.filter((data: any)=> data.key_words.some((e: any) => e.key_word_name == this.filterKeywords.value));
      }

      if (this.filterSeasons.value != null) {
        this.dataSource.data = this.dataSource.data.filter((data: any)=> data.seasons.some((e: any) => e.season_name == this.filterSeasons.value));
      }
    }  
  }


  keywordsName(keywords: any[]){
    let names: any[] = [];
    keywords.map((data: any) => names.push(' ' + data.key_word_name))
    return names
  }

  seasonsName(keywords: any[]){
    let names: any[] = [];
    keywords.map((data: any) => names.push(' ' + data.season_name))
    return names
  }

  filtersKeywords(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allKeywords.filter(keyword => keyword.toLowerCase().includes(filterValue));
  }

  filtersSeasons(value: string): any[] {
    var filterValue: any = '';
    if (typeof(value) == 'string'){
      filterValue = value.toLowerCase();      
    }
    return this.allSeasons.filter(season => season.name.toLowerCase().includes(filterValue))
  }
  
}
