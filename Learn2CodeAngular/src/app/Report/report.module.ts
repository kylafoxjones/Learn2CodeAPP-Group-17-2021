import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { AttendanceReportComponent } from './Attendance-Report/attendance-report/attendance-report.component';
import { FeedbackReportComponent } from './Feedback-Report/feedback-report/feedback-report.component';
import { SalesReportComponent } from './Sales-Report/sales-report/sales-report.component';
import { TotalStudentsReportComponent } from './TotalStudents-Report/total-students-report/total-students-report.component';
import { TutorDetailsReportComponent } from './TutorDetails-Report/tutor-details-report/tutor-details-report.component';
import { TutorSessionReportComponent } from './TutorSession-Report/tutor-session-report/tutor-session-report.component';


@NgModule({
  declarations: [
    ReportComponent,
    AttendanceReportComponent,
    FeedbackReportComponent,
    SalesReportComponent,
    TotalStudentsReportComponent,
    TutorDetailsReportComponent,
    TutorSessionReportComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule
  ]
})
export class ReportModule { }
