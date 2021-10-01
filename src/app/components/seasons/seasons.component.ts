import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SeasonsService } from 'src/app/services/seasons/seasons.service';
import { SeasonsFormComponent } from './seasons-form/seasons-form.component';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss']
})
export class SeasonsComponent implements OnInit {

  tableHeaders: string[] = [ 'No.', 'CÓDIGO', 'NOMBRE', 'ESTADO'];

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private seasonsService: SeasonsService,
  ) { }

  ngOnInit(): void {
    this.tableData = this.seasonsService.getSeasons();
    this.seasonsService.emitDataTable.subscribe((data: any) => {
      this.tableData = this.seasonsService.getSeasons().slice();
    })
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(SeasonsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      result.data.id = this.seasonsService.tableData.length + 1;
      result.data.code = this.seasonsService.tableData.length + 1;
      this.seasonsService.addSeason(result.data);
      dialogRef.close();
    }) 
    
  }

  onEdit(row: any) {
    console.log(row);
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(SeasonsFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      this.seasonsService.updateSeason(result);
      dialogRef.close();
    })
  }
  
  onDelete(id: number) {
    this.seasonsService.deleteSeason(id);
    this.tableData = this.seasonsService.getSeasons().slice();
  }
}
