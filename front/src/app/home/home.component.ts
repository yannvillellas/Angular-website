import { Component } from '@angular/core';
import {LearningPackageService} from "../learning-package.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  title = 'angular-website';
  learningPackages: any=[];
  packageTitle: any;
  randomQuestion: string;
  selectedPackageId: any;
  userAnswer: string = '';
  correctAnswer: string;
  showCorrectAnswer: boolean = false;

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

  getPackageWithRandomQuestion(id: number): void {
    this.learningPackageService.getLearningPackageById(id).subscribe(packageData => {
      if (packageData && packageData.questions) {
        const question = this.selectRandomQuestion(packageData.questions);
        this.randomQuestion = question;
        this.correctAnswer = packageData.questions[question];
        this.showCorrectAnswer = false; // Cache la réponse correcte initialement
      } else {
        this.randomQuestion = null;
      }
    });
  }

  validateAnswer(): void {
    this.showCorrectAnswer = true; // Affiche la réponse correcte
  }

  selectRandomQuestion(questions: Record<string, string>): string {
    const questionKeys = Object.keys(questions);
    if (questionKeys.length === 0) return null;
    const randomKey = questionKeys[Math.floor(Math.random() * questionKeys.length)];
    return randomKey;
  }
}
