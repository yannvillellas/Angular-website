import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "lessons", component: LessonsComponent },
  { path: "not-found", component: NotFoundComponent }, // Add this line
  { path: "**", redirectTo: "not-found" } // Redirect all other routes to the 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
