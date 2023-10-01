import { Injectable } from '@angular/core';
import{HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import{Knowledge} from "../model/knowledge";

@Injectable({
  providedIn: 'root'
})
export class KnowledgeService {
  basePath = 'http://localhost:3000/api/v1';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  }
  constructor(private http: HttpClient) { }
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Default error handling
      console.log(`An error occurred: ${error.error.message}`);
    } else {
      // Unsuccessful Response Error Code returned from Backend
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    // Return Observable with Error Message to Client
    return throwError(() => new Error('Something happened with request, please try again later'));
  }

  // Create Challenge
  create(item: any): Observable<Knowledge> {
    return this.http.post<Knowledge>(
      `${this.basePath}/knowledge`,
      item,
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get Student by id
  getById(id: any): Observable<Knowledge> {
    return this.http.get<Knowledge>(
      `${this.basePath}/${id}`,
      this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError));
  }

  // Get All Challenge
  getAll(): Observable<Knowledge> {
    return this.http.get<Knowledge>(`${this.basePath}/knowledge`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));

  }

  // Delete Challenge
  delete(id: any) {
    return this.http.delete(`${this.basePath}/knowledge/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Update Challenge
  update(id: any, item: any): Observable<Knowledge> {
    return this.http.put<Knowledge>(`${this.basePath}/knowledge/${id}`,
      JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
