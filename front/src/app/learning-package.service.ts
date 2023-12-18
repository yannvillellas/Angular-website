import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class LearningPackageService {
    private apiUrl = 'http://localhost:4200/api/learning-package';

    constructor(private http: HttpClient) { }

    getLearningPackages(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    getLearningPackageById(id: number): Observable<any> {
        return this.http.get(`${this.apiUrl}/${id}`);
    }
    addLearningPackage(newPackage: any): Observable<any> {
        return this.http.post(this.apiUrl, newPackage);
  }

}
