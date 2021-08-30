import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportingService {
  TutorSessionDetails: any = {};
  SalesTable: any = {};
  TutorId: any;
  StartDateT: Date;
  EndDateT: Date;
  StartDateS: Date;
  EndDateS: Date;

  exportObject: any = {};

  constructor(private http: HttpClient) {}
  apiUrl = 'https://localhost:44393/api/Reporting/';

  //#region TutorDetails
  getTutorDetails() {
    return this.http.get(this.apiUrl + 'TutorDetails');

    //#endregion

    //#region StudentDetails
  }

  getTotalStudents() {
    return this.http.get(this.apiUrl + 'StudentDetails');
  }
  //#endregion

  //region Attendance
  getSessionDropdown() {
    return this.http.get(this.apiUrl + 'AttendacSession');
  }

  getAttendedList(id: number) {
    return this.http.get(this.apiUrl + 'SessionAttendanceReport/' + id);
  }

  getAttendedGraphInfo(id: number) {
    return this.http.get(this.apiUrl + 'SessionAttendanceGraph/' + id);
  }

  //endregion

  //#region Feedback
  getFeedbackSessionDropdown() {
    return this.http.get(this.apiUrl + 'GetSessions');
  }

  getSessionDetails(id: number) {
    return this.http.get(this.apiUrl + 'GetSessionDetails/' + id);
  }

  getFeedbackList(id: number) {
    return this.http.get(this.apiUrl + 'GetSessionsFeedback/' + id);
  }

  getSessionFeedbackScore(id: number) {
    return this.http.get(this.apiUrl + 'GetSessionsFeedbackScore/' + id);
  }

  //#endregion

  //#region totaltutorsession

  GetTutorsessionsTutor() {
    return this.http.get(this.apiUrl + 'GetTutorsessionsTutor');
  }

  GetTotalTutorsessions(obj) {
    this.TutorSessionDetails = {
      TutorId: obj.TutorId,
      StartDate: obj.StartDate,
      EndDate: obj.EndDate,
    };
    return this.http.post(
      this.apiUrl + 'GetTotalTutorsessions',
      this.TutorSessionDetails
    );
  }

  ///#endregion

  //#region SalesReport
  GetSalesReportTable(obj) {
    this.SalesTable = {
      StartDate: obj.StartDate,
      EndDate: obj.EndDate,
    };
    return this.http.post(this.apiUrl + 'GetSalesReport', this.SalesTable);
  }

  GetSubscriptionSales() {
    return this.http.get(this.apiUrl + 'SubscriptionSales');
  }

  GetCourseSales(): Observable<any> {
    return this.http.get(this.apiUrl + 'CourseSales');
  }

  export(obj): Observable<any> {
    return this.http.post(this.apiUrl + 'ExportSalesReport', obj, {
      responseType: 'blob',
    });
  }
}
