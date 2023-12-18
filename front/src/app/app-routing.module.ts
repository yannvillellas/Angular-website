import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LessonsComponent} from "./lessons/lessons.component";
import {AboutComponent} from "./about/about.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  {path:"", component: HomeComponent},
  {path:"lessons", component: LessonsComponent},
  {path:"about", component: AboutComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
