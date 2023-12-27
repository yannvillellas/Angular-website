import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningPackageService } from '../learning-package.service';
import {LearningPackage} from "../learning_package.model";
import {Question} from "../question.model";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  packageId: number;
  learningPackage: LearningPackage;
  updateSuccess: boolean = false;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private learningPackageService: LearningPackageService
  ) {}

    //update the list of questions/answers
  updateQuestions(): void {
    this.learningPackageService.updateLearningPackageQuestions(this.learningPackage.id, this.learningPackage.questions) //envoie au backend la nouvelle liste de questions
        .subscribe(
            response => {
              console.log('Questions updated:', response);
              this.updateSuccess = true;
            },
            error => {
              console.error('Error updating questions:', error);
            }
        );
  }

  // add a new question to the list
    addNewQuestion(): void {
        const newQuestion: Question = {
            question: '',
            answer: '',
            userKnowledgeLevel: 'low' //new question had bad knowledge
        };
        this.learningPackage.questions.push(newQuestion);
    }

    // delete a question
    deleteQuestion(index: number): void {
        this.learningPackage.questions.splice(index, 1);
    }

    ngOnInit(): void {
    // Subscribe to the route parameter changes
    this.route.params.subscribe(params => {
      this.packageId = +params['id']; // Convert id to a number

      // Check if the packageId exists in the learningPackages array
      if (!this.learningPackageService.packageExists(this.packageId)) {
        // If the packageId does not exist redirect to a default page
        this.router.navigate(['/not-found'], {skipLocationChange: true}); // Redirect to a not-found page
      } else {
        // If the packageId exists, fetch the learning package
        this.learningPackageService.getLearningPackageById(this.packageId).subscribe(
            data => {
              console.log(data);
              this.learningPackage = data; //init the learning package choose by the user
            },
            error => {
              console.error('Error fetching package:', error);
              // redirect to a default page
              this.router.navigate(['/not-found'], { skipLocationChange: true });
            }
        );
      }
    });
  }
}