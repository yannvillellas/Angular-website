import { Component } from '@angular/core';
import {ColDef} from "ag-grid-community";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
rowData:any[]=[
  {price:10},
  {price:20}
];
colDefs:ColDef[]=[
  {field:'price'}
];
}
