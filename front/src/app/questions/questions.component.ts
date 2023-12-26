import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LearningPackageService } from '../learning-package.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  packageId: number;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private learningPackageService: LearningPackageService
  ) {}

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
              // Handle the data as needed
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