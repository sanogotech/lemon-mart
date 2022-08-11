import { Component, OnInit ,ViewChild} from '@angular/core'


//TODO
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../dialog-box/dialog-box.component';

export interface UsersData {
  name: string;
  id: number;
}

const ELEMENT_DATA: UsersData[] = [
  {id: 1560608769632, name: 'Artificial Intelligence'},
  {id: 1560608796014, name: 'Machine Learning'},
  {id: 1560608787815, name: 'Robotic Process Automation'},
  {id: 1560608805101, name: 'Blockchain'}
];

@Component({
  selector: 'app-manager-home',
  styles: [],
  template: `

<br>
<br>
<br>

    <!-- app.component.html -->
<div class="container text-center">


<button mat-button (click)="openDialog('Add',{})" mat-flat-button color="primary">Add Row</button>

<table mat-table [dataSource]="dataSource" #mytable class="my-table mat-elevation-z8">

  <!--- Note that these columns can be defined in any order.
      The actual rendered columns are set as a property on the row definition" -->

  <!-- Id Column -->
  <ng-container matColumnDef="id">
    <th mat-header-cell *matHeaderCellDef> ID. </th>
    <td mat-cell *matCellDef="let element"> {{element.id}} </td>
  </ng-container>

  <!-- Name Column -->
  <ng-container matColumnDef="name">
    <th mat-header-cell *matHeaderCellDef> Name </th>
    <td mat-cell *matCellDef="let element"> {{element.name}} </td>
  </ng-container>

  <!-- Action Column -->
  <ng-container matColumnDef="action">
    <th mat-header-cell *matHeaderCellDef> Action </th>
    <td mat-cell *matCellDef="let element" class="action-link">
      <a (click)="openDialog('Update',element)">Edit</a> |
      <a (click)="openDialog('Delete',element)">Delete</a>
    </td>
  </ng-container>

  <tr mat-header-row ></tr>
  <tr mat-row ></tr>
 <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
  <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>

</table>

</div>

<p>
      <img
        src="https://user-images.githubusercontent.com/822159/36186559-c2ee9c4a-110d-11e8-80a6-933943a1336f.png"
      />
</p>
  `,
})


export class ManagerHomeComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'action'];
  dataSource = ELEMENT_DATA;

  @ViewChild(MatTable, { static: true })
  table!: MatTable<any>;

  constructor(public dialog: MatDialog) {}

  openDialog(action:string,obj: { action: string; }) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data:obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result.event == 'Add'){
        this.addRowData(result.data);
      }else if(result.event == 'Update'){
        this.updateRowData(result.data);
      }else if(result.event == 'Delete'){
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: { name: any; }){
    var d = new Date();
    this.dataSource.push({
      id:d.getTime(),
      name:row_obj.name
    });
    this.table.renderRows();

  }
  updateRowData(row_obj: { id: number; name: string; }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      if(value.id == row_obj.id){
        value.name = row_obj.name;
      }
      return true;
    });
  }
  deleteRowData(row_obj: { id: number; }){
    this.dataSource = this.dataSource.filter((value,key)=>{
      return value.id != row_obj.id;
    });
  }


  ngOnInit() {}
}
