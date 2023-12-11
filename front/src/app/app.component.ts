import {Component, OnInit} from '@angular/core';
import { LearningPackageService } from './learning-package.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'angular-website';
  learningPackages: any=[];

  constructor(private learningPackageService: LearningPackageService) { }

  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });
  }
}
