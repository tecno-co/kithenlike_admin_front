import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TableData } from 'src/app/models/table-data/table-data';
import { ThemesService } from 'src/app/services/themes/themes.service';
import { ThemesFormComponent } from './themes-form/themes-form.component';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.scss']
})
export class ThemesComponent implements OnInit {
  tableHeaders: string[] = [ 'No.', 'CÓDIGO', 'NOMBRE', 'ESTADO'];

  tableData: any[] = [];

  constructor(
    public dialog: MatDialog,
    private themeService: ThemesService,
  ) {}

  ngOnInit(): void {
    this.themeService.getThemes().subscribe((data: any) => {
      this.tableData = data;
    });

    this.themeService.emitDataTable
      .subscribe((res: any) => {
        this.tableData = res.data;
    })
  }

  onAdd () {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.disableClose = false;    
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(ThemesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      this.themeService.addTheme(result.data);
      dialogRef.close();
    }) 
    
  }

  onEdit(row: any) {
    let dialogConfig = new MatDialogConfig;
    dialogConfig.data = row;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "50%";
    let dialogRef = this.dialog.open(ThemesFormComponent, dialogConfig);
    dialogRef.componentInstance.dialogEmit.subscribe((result: any ) => {
      this.themeService.updateTheme(result);
      dialogRef.close();
    })
  }
  
  onDelete(id: number) {
    this.themeService.deleteTheme(id);
    // this.tableData = this.themeService.getThemes().slice();
  }
}
