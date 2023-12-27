import {Component, OnInit} from '@angular/core';
import {LearningPackageService} from "../learning-package.service";
import { LearningPackage } from '../learning_package.model';


@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit{
  title = 'angular-website';
  learningPackages: any=[];
  packageTitle: any;

  editingStatus: { [packageId: number]: boolean } = {}; //use to know if we modify a package title or not

  constructor(private learningPackageService: LearningPackageService) { }

  addNewLearningPackage(packageTitle: string): void {
    const newPackage = { title: packageTitle }; // create package with title
    this.learningPackageService.addLearningPackage(newPackage).subscribe(
        data => {
          console.log('Package added:', data);
          this.learningPackages.push(data); // add new package
          this.packageTitle = ''; // reset user input
        },
        error => console.error('Error adding package:', error)
    );
  }

  deletePackage(id: number): void {
    this.learningPackageService.deleteLearningPackage(id).subscribe(() => {
      // get the new package list
      this.learningPackageService.getLearningPackages().subscribe(data => {
        console.log(data);
        this.learningPackages = data;
      });
      this.learningPackages = this.learningPackages.filter(pkg => pkg.id !== id);
    }, error => {
      console.error('Error deleting package:', error);
    });
  }

  enableEditing(id: number): void {
    this.editingStatus[id] = true;
  }

  updatePackageName(id: number, title: string): void {
    this.editingStatus[id] = false;
    this.learningPackageService.updateLearningPackageName(id, title)
        .subscribe(

        );
  }


  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });
  }
}
