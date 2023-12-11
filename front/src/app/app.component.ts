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
  packageTitle: any;

  constructor(private learningPackageService: LearningPackageService) { }
  addNewLearningPackage(packageTitle: string): void {
    const newPackage = { title: packageTitle }; // Créez l'objet package avec le titre
    this.learningPackageService.addLearningPackage(newPackage).subscribe(
      data => {
        console.log('Package added:', data);
        this.learningPackages.push(data); // Ajoutez le nouveau package à la liste
      },
      error => console.error('Error adding package:', error)
    );
  }
  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });




  }
}
