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
import { ChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';
import { ReportHomeComponent } from './Home/report-home/report-home.component';
import { NbLayoutModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { MatNativeDateModule } from '@angular/material/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatMenuModule } from '@angular/material/menu';








@NgModule({
  declarations: [
    ReportComponent,
    AttendanceReportComponent,
    FeedbackReportComponent,
    SalesReportComponent,
    TotalStudentsReportComponent,
    TutorDetailsReportComponent,
    TutorSessionReportComponent,
    ReportHomeComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    ChartsModule,
    NbLayoutModule,
    FormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatSelectModule,
    MatNativeDateModule,
    NgxChartsModule,
   NgxPaginationModule,
   MatMenuModule,
   

    
    
  
    
  
  
 
  
  
    
  
  ]
})
export class ReportModule { }
