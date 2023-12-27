import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningPackageService } from '../learning-package.service';
import {LearningPackage} from "../learning_package.model";

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  packageId: number;
  learningPackage: LearningPackage;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private learningPackageService: LearningPackageService
  ) {}

  updateQuestions(): void {
    // Logique pour envoyer les questions mises à jour au backend
    this.learningPackageService.updateLearningPackageQuestions(this.learningPackage.id, this.learningPackage.questions)
        .subscribe(
            response => {
              console.log('Questions updated:', response);
            },
            error => {
              console.error('Error updating questions:', error);
            }
        );
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
              this.learningPackage = data;
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