import { Component, OnInit } from '@angular/core';
import { ReportingService } from '../../Report resources/reporting.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { ChartsModule, Color, Label } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NbLayoutComponent } from '@nebular/theme';
import { NbLayoutColumnComponent } from '@nebular/theme';
import { NgxPaginationModule } from 'ngx-pagination';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-tutor-session-report',
  templateUrl: './tutor-session-report.component.html',
  styleUrls: ['./tutor-session-report.component.scss']
})
export class TutorSessionReportComponent implements OnInit {

    //pagination
    page1:number = 1;
    totalLength1:any;
    //Lists
    TutorDropdown:any = [];
    TutorSession: any = [];
    //object details
    TutorID: any = 0;
    Start:any;
    End:any;
    //object instance
    ObjectToSend: any = {};
    //count sessions
    TutorName:any;
    tutorxv: any;


  constructor(
   private router: Router,
   private ReportService : ReportingService) { }

  ngOnInit(): void {
    this.getTutorDropdown();
    console.log(this.ObjectToSend);
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }

  changeSession(value) {

    this.TutorID = value;


    }
 
    public logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('id');
      this.router.navigate(['/loginhomepage/login']);
    };



    getTutorDropdown(){
      this.ReportService.GetTutorsessionsTutor().subscribe((result) =>{
          this.TutorDropdown = result;
          console.log(this.TutorDropdown);
      })
    }

    getTutorSessions(){


      this.ObjectToSend.TutorId = this.TutorID;
      this.ObjectToSend.StartDate = this.Start;
      this.ObjectToSend.EndDate = this.End;
      console.log(this.ObjectToSend);
      this.ReportService.GetTotalTutorsessions(this.ObjectToSend).subscribe((result) => {


        this.TutorSession = result;
        this.TutorName = this.TutorSession[0].tutorName;
        this.totalLength1 = this.TutorSession.length;
        console.log(this.TutorName);
        console.log(this.TutorSession);


      })
    }

    public RedirectReportHome(){
      this.router.navigateByUrl('/report-home');
    }

    public DownloadPDF():void {
      let data = document.getElementById('TutorsessionData');

      html2canvas(data).then(canvas => {

          let fileWidth = 300;
          let fileHeight = canvas.height * fileWidth / canvas.width;

          const FILEURI = canvas.toDataURL('image/png')
          let PDF = new jsPDF('l', 'mm', 'a4');
          let position = 0;
          PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)

          PDF.save('TutorSessionReport.pdf');
      });
    }

}
