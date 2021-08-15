import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {

  constructor(private http: HttpClient) { }
  apiUrl = 'https://localhost:44393/api/Reporting/';


    //#region TutorDetails
    getTutorDetails() {
      return this.http.get(this.apiUrl + 'TutorDetails');

        //#endregion

        //#region StudentDetails
     }


     getTotalStudents(){
      return this.http.get(this.apiUrl + 'StudentDetails');
      }
      //#endregion
}
