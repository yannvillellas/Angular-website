import {Component, OnInit} from '@angular/core';
import {LearningPackageService} from "../learning-package.service";

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit{
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

  deletePackage(id: number): void {
    this.learningPackageService.deleteLearningPackage(id).subscribe(() => {
      // Filtrer le package supprimé de la liste 'learningPackages'
      this.learningPackageService.getLearningPackages().subscribe(data => {
        console.log(data);
        this.learningPackages = data;
      });
      this.learningPackages = this.learningPackages.filter(pkg => pkg.id !== id);
    }, error => {
      console.error('Error deleting package:', error);
    });
  }

  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });
  }
}
