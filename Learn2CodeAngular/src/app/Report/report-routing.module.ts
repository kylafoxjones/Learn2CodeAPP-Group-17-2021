import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttendanceReportComponent } from './Attendance-Report/attendance-report/attendance-report.component';
import { FeedbackReportComponent } from './Feedback-Report/feedback-report/feedback-report.component';
import { ReportComponent } from './report.component';
import { SalesReportComponent } from './Sales-Report/sales-report/sales-report.component';
import { TotalStudentsReportComponent } from './TotalStudents-Report/total-students-report/total-students-report.component';
import { TutorDetailsReportComponent } from './TutorDetails-Report/tutor-details-report/tutor-details-report.component';
import { TutorSessionReportComponent } from './TutorSession-Report/tutor-session-report/tutor-session-report.component';

const routes: Routes = [
  { path: 'Report', component: ReportComponent },
  { path: 'TutorDetails-Report', component: TutorDetailsReportComponent },
  { path: 'Sales-Report', component: SalesReportComponent },
  { path: 'Attendance-Report', component: AttendanceReportComponent },
  { path: 'Feedback-Report', component: FeedbackReportComponent },
  { path: 'TotalStudents-Report', component: TotalStudentsReportComponent },
  { path: 'TutorSession-Report', component: TutorSessionReportComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
