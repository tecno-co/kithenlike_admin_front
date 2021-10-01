import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { COMMA, ENTER}  from '@angular/cdk/keycodes';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DesignsService } from 'src/app/services/designs/designs.service';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit, OnChanges {
    
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  @Input("headers") tableHeaders: string[] = [];
  @Input("data") tableData!: any[];
  @Input("filter") filter: boolean = false;

  @Output() image: EventEmitter<String> = new EventEmitter();
  @Output() emitAdd: EventEmitter<number> = new EventEmitter();
  @Output() emitEdit: EventEmitter<number> = new EventEmitter();
  @Output() emitDelete: EventEmitter<any> = new EventEmitter();
  
  dataSource =  new MatTableDataSource<any>();
  tableCols: any[] = [];
  formControl = new FormControl(['angular']);
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  copied: boolean = false;

  constructor(
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    public service: DesignsService
  ) {}

  ngOnInit(): void {
    this.dataSource.data = this.tableData;
    this.tableCols = (this.tableData && this.tableData.length > 0) ?  Object.keys(this.tableData[0]) : [];
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log("Cambio detectado en la tabla");
    this.dataSource.data = this.tableData;
  }
  
  // Sends path of image in table
  onSelectImage(path: String) {
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

  onDelete(id: number) {
    this.emitDelete.emit(id);
    this.dataSource = new MatTableDataSource(this.tableData);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
