import {Component, OnInit} from '@angular/core';
import {LearningPackageService} from "../learning-package.service";
import { LearningPackage } from '../learning_package.model';
import { Question } from '../question.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  title = 'angular-website';
  learningPackages: LearningPackage[] = [];
  randomQuestion: string;
  selectedPackageId: any;
  correctAnswer: string;
  showCorrectAnswer: boolean = false;
  selectedQuestionIndex: number;

  constructor(private learningPackageService: LearningPackageService) { }

  getPackageWithRandomQuestion(id: number): void {
    this.learningPackageService.getLearningPackageById(id).subscribe(packageData => { //recupere un learning package depuis son id
      if (packageData && packageData.questions) { // si il existe et a des questions
        const selectedQuestion = this.selectRandomQuestion(packageData.questions); //on selectionne une q aleatoire
        if (selectedQuestion) {
          this.randomQuestion = selectedQuestion.question; //enonce
          this.correctAnswer = selectedQuestion.answer; // reponse
          this.showCorrectAnswer = false; //n affiche pas la reponse par defaut
          this.selectedQuestionIndex = packageData.questions.indexOf(selectedQuestion); // get the index
        } else {
          this.randomQuestion = null;
        }
      } else {
        this.randomQuestion = null;
      }
    });
  }

  selectRandomQuestion(questions: Question[]): Question {
    const weightedQuestions = questions.map(question => {
      switch (question.userKnowledgeLevel) {
        case 'low':
          return Array(3).fill(question); // apparait 3x dans le tableau
        case 'medium':
          return Array(2).fill(question); // apparait 2x
        case 'high':
          return Array(1).fill(question); // apparait une seul fois
      }
    }).reduce((acc, val) => acc.concat(val), []); // applatit le tableau en un seul

    console.log(weightedQuestions);
    if (weightedQuestions.length === 0) return null;
    const randomIndex = Math.floor(Math.random() * weightedQuestions.length); //selectionne aleatoirement dans le tableau
    return weightedQuestions[randomIndex]; // retourne la question
  }

  validateAnswer(): void {
    this.showCorrectAnswer = true; // Affiche la réponse correcte
  }


  updateUserKnowledgeLevel(questionIndex: number, knowledgeLevel: string): void {
    this.learningPackageService.updateQuestionKnowledgeLevel(this.selectedPackageId, questionIndex, knowledgeLevel).subscribe(
        response => {
          console.log('Knowledge level updated:', response);
        },
        error => {
          console.error('Error updating knowledge level:', error);
        }
    );
  }


  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });
  }
}
