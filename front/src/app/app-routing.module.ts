import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from "./about/about.component";
import {LessonsComponent} from "./lessons/lessons.component";
import {QuestionsComponent} from "./questions/questions.component";
import {NotFoundComponent} from "./not-found/not-found.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "lessons", component: LessonsComponent },
  { path: "lessons/:id", component: QuestionsComponent},
  { path: "**", component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
