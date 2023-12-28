import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { LessonsComponent } from './lessons/lessons.component';
import { AboutComponent } from './about/about.component';
import {AgGridModule} from "ag-grid-angular";


import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { QuestionsComponent } from './questions/questions.component';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    AboutComponent,
    HomeComponent,
    NotFoundComponent,
    QuestionsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
      AgGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
