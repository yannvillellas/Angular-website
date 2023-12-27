import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {LearningPackage} from "../app/learning_package.model";
import { Question } from '../app/question.model';


@Injectable({
    providedIn: 'root'
})
export class LearningPackageService {
    private apiUrl = 'http://localhost:4200/api/learning-package';

    constructor(private http: HttpClient) { }

    getLearningPackages(): Observable<LearningPackage[]> {
        return this.http.get<LearningPackage[]>(`${this.apiUrl}`);
    }

    getLearningPackageById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    addLearningPackage(newPackage: any): Observable<any> {
        return this.http.post(this.apiUrl, newPackage);
    }

    deleteLearningPackage(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
    }

    updateQuestionKnowledgeLevel(packageId: number, questionIndex: number, knowledgeLevel: string): Observable<any> {
        const body = { userKnowledgeLevel: knowledgeLevel };
        return this.http.put(`${this.apiUrl}/${packageId}/question/${questionIndex}`, body,{ responseType: 'text' });
    }

    updateLearningPackageQuestions(packageId: number, questions: Question[]): Observable<any> {
        const body = { questions };
        return this.http.put(`${this.apiUrl}/${packageId}`, body,{ responseType: 'text' });
    }


    packageExists(packageId: number): boolean {
        return this.http.get(`${this.apiUrl}/${packageId}`) != null;
    }
}
