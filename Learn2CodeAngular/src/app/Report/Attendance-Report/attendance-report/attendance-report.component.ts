import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { NbThemeModule, NbLayoutModule, NbSidebarComponent } from '@nebular/theme';
import { MatFormField } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReportingService } from '../../Report resources/reporting.service';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrls: ['./attendance-report.component.scss']
})
export class AttendanceReportComponent implements OnInit {

  SessionList:any = [];
  AttendedList:any = [];


  constructor(
    private reportService: ReportingService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.SessionDropdown(),
    this.AttendanceList()
  
  }
  x(){
    Swal.fire(
      '',
      'Successfully downloaded report',
      'success'
    )
  }


 SessionDropdown(){
  this.reportService.getSessionDropdown().subscribe((result) => {
    this.SessionList = result; 
    console.log(this.SessionList);
  });
 }

 AttendanceList(){
  this.reportService.getAttendedList().subscribe((result) => {
    this.AttendedList = result; 
    console.log(this.AttendedList);
   })
 }

 
 public RedirectReportHome(){
  this.router.navigateByUrl('/report-home');
}

public DownloadPDF():void {
  let data = document.getElementById('TutorDetailsData');
    
  html2canvas(data).then(canvas => {
      
      let fileWidth = 240;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('TutorDetailsReport.pdf');
  });     
}

}