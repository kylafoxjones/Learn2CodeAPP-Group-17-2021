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

      //region Attendance
      getSessionDropdown(){
        return this.http.get(this.apiUrl + 'AttendacSession');
      }

      getAttendedList(id:number){
        return this.http.get(this.apiUrl + 'SessionAttendanceReport/' + id);
      }
   
      getAttendedGraphInfo(id:number){
        return this.http.get(this.apiUrl + 'SessionAttendanceGraph/' + id);
      }


      //endregion
     
      //#region Feedback
      getFeedbackSessionDropdown(){
        return this.http.get(this.apiUrl + 'GetSessions');
      }

      getSessionDetails(id:number){
        return this.http.get(this.apiUrl + 'GetSessionDetails/' + id);
      }

      getFeedbackList(id:number){
        return this.http.get(this.apiUrl + 'GetSessionsFeedback/' + id);
      }

      getSessionFeedbackScore(id:number){
        return this.http.get(this.apiUrl + 'GetSessionsFeedbackScore/' + id);
      }



      //#endregion
}
