import {Component, OnInit} from '@angular/core';
import {ColDef} from "ag-grid-community";
import {HttpClient} from "@angular/common/http";
import {LearningPackage} from "../learning_package.model";

import {Observable, take} from "rxjs";
import {LearningPackageService} from "../learning-package.service";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
    rowData$: Observable<LearningPackage[]>;
    colDefs: ColDef[] = [{field: 'title', headerName:'Lesson',width: 250 },
        {field: 'description', headerName:'Description',width: 400 },
        {field: 'category', headerName:'Category'},
        {field: 'targetAudience', headerName:'Audience'},
        {field: 'id', headerName:'ID',width: 250}];
    learningPackages: LearningPackage[] = [];
    private gridOptions: any = {
        domLayout: 'autoHeight',
        autoWidth: true,
        suppressHorizontalScroll: false
    };
    onGridReady(params: any) {
        this.gridOptions = params.api;
        this.gridOptions.api.sizeColumnsToFit();
    }

    constructor(private learningPackageService: LearningPackageService) { }


    ngOnInit(): void {

        this.rowData$ = this.learningPackageService.getLearningPackages();
        this.rowData$.subscribe(data => {
            this.gridOptions.api.sizeColumnsToFit();
        });
    }

   
}

