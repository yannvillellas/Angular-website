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
  learningPackages: LearningPackage[] = [];
  randomQuestion: string;
  selectedPackageId: any;
  correctAnswer: string;
  showCorrectAnswer: boolean = false;
  selectedQuestionIndex: number;

  previousRandomQuestion: string;
  previousSelectedPackageId: any;
  previousCorrectAnswer: string;
  previousSelectedQuestionIndex: number;

  showAnswerButton: boolean = true;
  showPreviousButton: boolean = false;

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
    // reset les boutons
    this.showAnswerButton = true;
    this.showPreviousButton = false;
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

    this.showAnswerButton = false;
    this.showPreviousButton = false;
  }


  updateUserKnowledgeLevel(questionIndex: number, knowledgeLevel: string): void {
    this.learningPackageService.updateQuestionKnowledgeLevel(this.selectedPackageId, questionIndex, knowledgeLevel).subscribe(
        response => {
          console.log('Knowledge level updated:', response);
          //save question to go back to previous
          this.previousRandomQuestion = this.randomQuestion;
          this.previousSelectedPackageId = this.selectedPackageId;
          this.previousCorrectAnswer =this.correctAnswer;
          this.previousSelectedQuestionIndex = this.selectedQuestionIndex;
          this.getPackageWithRandomQuestion(this.selectedPackageId);

          this.showPreviousButton = true;
        },
        error => {
          console.error('Error updating knowledge level:', error);
        }
    );
  }

previousQuestion(): void {
  this.randomQuestion = this.previousRandomQuestion;
  this.selectedPackageId = this.previousSelectedPackageId;
  this.correctAnswer = this.previousCorrectAnswer;
  this.selectedQuestionIndex = this.previousSelectedQuestionIndex;
  this.showCorrectAnswer =true; // permet d'afficher directement la réponse de la dernière question

  // reset les boutons
  this.showAnswerButton = false;
  this.showPreviousButton = false;
}

  ngOnInit(): void {
    this.learningPackageService.getLearningPackages().subscribe(data => {
      console.log(data);
      this.learningPackages = data;
    });
  }
}
